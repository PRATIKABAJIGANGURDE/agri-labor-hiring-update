import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabase } from '@/lib/supabase'

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
      if (!user.email) return false

      try {
        // Sign in with Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${process.env.NEXTAUTH_URL}/auth/callback`
          }
        })

        if (authError) {
          console.error('Supabase auth error:', authError)
          return false
        }

        // Check if user exists in our users table
        const { data: existingUser } = await supabase
          .from('users')
          .select('*')
          .eq('id', authData.user?.id)
          .single()

        if (!existingUser) {
          // Create new user if doesn't exist
          const { error: insertError } = await supabase
            .from('users')
            .insert([
              {
                id: authData.user?.id,
                email: user.email,
                full_name: user.name,
                avatar_url: user.image,
              }
            ])

          if (insertError) {
            console.error('Error creating user:', insertError)
            return false
          }
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
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
      // If the url starts with a slash, prepend the base url
      if (url.startsWith('/')) {
        return `${baseUrl}${url}`
      }
      // If the url is already a valid URL, return it
      else if (url.startsWith('http')) {
        return url
      }
      // Default to the base url
      return baseUrl
    }
  },
  events: {
    async signOut({ token }) {
      await supabase.auth.signOut()
    }
  }
}

export default NextAuth(authOptions)
