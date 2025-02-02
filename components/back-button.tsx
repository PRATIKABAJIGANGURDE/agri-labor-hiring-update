"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface BackButtonProps {
  className?: string
}

export function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter()

  return (
    <Button variant="outline" size="sm" className={`mb-4 ${className}`} onClick={() => router.back()}>
      <ArrowLeft className="mr-2 h-4 w-4" />
      Back
    </Button>
  )
}

