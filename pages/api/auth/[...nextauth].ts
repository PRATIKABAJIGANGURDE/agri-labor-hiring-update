import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from '@/lib/supabase'
import { getSession } from "next-auth/react"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string
      name: string
      image?: string
      role?: string
    } & DefaultSession["user"]
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }: { 
      user: any; 
      account: any; 
      profile?: any 
    }) {
      console.log('SignIn attempt:', { 
        email: user.email,
        name: user.name,
        provider: account?.provider
      })

      if (!user.email) {
        console.error('Sign in failed: No email provided')
        return false
      }

      try {
        const { data: existingUser, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', user.email)
          .single()

        if (!existingUser) {
          // If user doesn't exist, redirect them to user type selection
          return '/auth/user-type-select'
        }

        // If user exists, continue with sign in
        return true
      } catch (error) {
        console.error('Error during sign in:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user) {
        // Get user data from Supabase
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('email', session.user.email)
          .single()

        if (userData) {
          session.user.id = userData.id
          session.user.role = userData.role
        }
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.accessToken = account.access_token
      }
      return token
    },
    async redirect({ url, baseUrl }) {
      // If the url is the user type selection page, allow it
      if (url.startsWith('/auth/user-type-select')) {
        return `${baseUrl}${url}`
      }

      // Allow the default callback url
      return url.startsWith(baseUrl) ? url : baseUrl
    },
  }
}

export default NextAuth(authOptions)
