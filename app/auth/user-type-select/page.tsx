'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function UserTypeSelect() {
  const { data: session } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleUserTypeSelection = async (userType: string) => {
    if (!session?.user?.email) return
    
    setLoading(true)
    try {
      // First, create or update the user record
      const { error: upsertError } = await supabase
        .from('users')
        .upsert({
          email: session.user.email,
          full_name: session.user.name,
          avatar_url: session.user.image,
          user_type: userType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (upsertError) throw upsertError

      // Redirect to dashboard after successful selection
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving user type:', error)
      alert('Failed to save user type. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-8">Select Your Role</h1>
        <div className="space-y-4">
          <button
            onClick={() => handleUserTypeSelection('farmer')}
            disabled={loading}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <h3 className="font-semibold">Farmer</h3>
            <p className="text-sm text-gray-600">I want to hire agricultural laborers</p>
          </button>

          <button
            onClick={() => handleUserTypeSelection('labor')}
            disabled={loading}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <h3 className="font-semibold">Labor</h3>
            <p className="text-sm text-gray-600">I am looking for agricultural work</p>
          </button>

          <button
            onClick={() => handleUserTypeSelection('contractor')}
            disabled={loading}
            className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
          >
            <h3 className="font-semibold">Contractor</h3>
            <p className="text-sm text-gray-600">I manage and provide agricultural labor</p>
          </button>
        </div>
      </div>
    </div>
  )
}
