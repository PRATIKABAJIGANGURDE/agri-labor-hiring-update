"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, Lock } from "lucide-react"

export default function Login() {
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone")
  const [otpSent, setOtpSent] = useState(false)
  const [showOtpInput, setShowOtpInput] = useState(false) //This is not used anymore.  Can be removed.
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!otpSent) {
      // Simulate sending OTP
      console.log("Sending OTP...")
      setOtpSent(true)
    } else {
      // Simulate verifying OTP
      console.log("Verifying OTP...")
      const userRole = Math.random() < 0.5 ? "farmer" : "worker"
      localStorage.setItem("userRole", userRole)
      if (userRole === "farmer") {
        router.push("/dashboard/farmer")
      } else {
        router.push("/dashboard/worker")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Log in to AgriLabor Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-center space-x-4 mb-4">
              <Button
                type="button"
                variant={loginMethod === "phone" ? "default" : "outline"}
                onClick={() => setLoginMethod("phone")}
              >
                <Phone className="mr-2 h-4 w-4" /> Phone
              </Button>
              <Button
                type="button"
                variant={loginMethod === "email" ? "default" : "outline"}
                onClick={() => setLoginMethod("email")}
              >
                <Mail className="mr-2 h-4 w-4" /> Email
              </Button>
            </div>
            <div>
              <Input
                type={loginMethod === "phone" ? "tel" : "email"}
                placeholder={loginMethod === "phone" ? "Phone number" : "Email address"}
                required
              />
            </div>
            {otpSent && (
              <div>
                <Input type="text" placeholder="Enter OTP" required/>
              </div>
            )}
            <Button type="submit" className="w-full">
              {otpSent ? "Verify OTP" : "Send OTP"}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
              Forgot password?
            </Link>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

