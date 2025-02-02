import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const userRole = localStorage.getItem("userRole")
    if (!userRole || !allowedRoles.includes(userRole)) {
      router.push("/login")
    } else {
      setIsAuthorized(true)
    }
  }, [router, allowedRoles])

  if (!isAuthorized) {
    return null
  }

  return <>{children}</>
}

