import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { JWT } from "next-auth/jwt"
import { supabase } from '@/lib/supabase'

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
      email: string
      name: string
      image?: string
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
    async signIn({ user, account }) {
      if (!user.email) return false

      try {
        const { data: { user: supabaseUser }, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            queryParams: {
              access_token: account?.access_token,
              expires_in: account?.expires_at,
            },
          },
        })

        if (error) {
          console.error('Supabase auth error:', error)
          return false
        }

        return true
      } catch (error) {
        console.error('Error in signIn callback:', error)
        return false
      }
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
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
