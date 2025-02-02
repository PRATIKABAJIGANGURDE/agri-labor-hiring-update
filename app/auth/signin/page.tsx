'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SignIn() {
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', {
        callbackUrl: '/'
      })
    } catch (error) {
      console.error('Sign in error:', error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-6 shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Welcome
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please sign in to continue
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
          >
            <Image
              src="https://www.google.com/favicon.ico"
              alt="Google logo"
              width={20}
              height={20}
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  )
}
