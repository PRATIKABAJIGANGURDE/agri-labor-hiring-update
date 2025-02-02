"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tractor, User } from "lucide-react"

export default function Register() {
  const [role, setRole] = useState<"farmer" | "worker" | null>(null)
  const [step, setStep] = useState(1)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 1 && role) {
      setStep(2)
    } else if (step === 2) {
      // Simulate registration process
      console.log("Registration submitted")
      localStorage.setItem("userRole", role as string)

      // Redirect based on role
      if (role === "farmer") {
        router.push("/dashboard/farmer")
      } else if (role === "worker") {
        router.push("/dashboard/worker")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Sign up for AgriLabor Connect</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                <div className="text-center mb-4">Select your role:</div>
                <div className="flex justify-center space-x-4">
                  <Button
                    type="button"
                    variant={role === "farmer" ? "default" : "outline"}
                    onClick={() => setRole("farmer")}
                    className="w-1/2"
                  >
                    <Tractor className="mr-2 h-4 w-4" /> Farmer
                  </Button>
                  <Button
                    type="button"
                    variant={role === "worker" ? "default" : "outline"}
                    onClick={() => setRole("worker")}
                    className="w-1/2"
                  >
                    <User className="mr-2 h-4 w-4" /> Worker
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Input placeholder="Full Name" required />
                <Input placeholder="Phone Number" type="tel" required />
                <Input placeholder="Email" type="email" required />
                <Input placeholder="Location" required />
                {role === "worker" && (
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your skills" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="harvesting">Harvesting</SelectItem>
                      <SelectItem value="planting">Planting</SelectItem>
                      <SelectItem value="machinery">Machinery Operation</SelectItem>
                      <SelectItem value="livestock">Livestock Management</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </>
            )}
            <Button type="submit" className="w-full" disabled={step === 1 && !role}>
              {step === 1 ? "Next" : "Register"}
            </Button>
          </form>
          {step === 2 && (
            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => setStep(1)}>
                Back
              </Button>
            </div>
          )}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

