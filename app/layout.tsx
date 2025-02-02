"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import "./globals.css"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Menu, X, Briefcase, Info, Mail } from "lucide-react"
import { AuthProvider } from "@/components/auth-provider"
import { AuthButton } from "@/components/auth-button"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/jobs", icon: Briefcase, label: "Jobs" },
    { href: "/about", icon: Info, label: "About" },
    { href: "/contact", icon: Mail, label: "Contact" },
  ]

  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground`}>
        <AuthProvider>
          <nav className="bg-primary text-primary-foreground p-4">
            <div className="container mx-auto">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold">
                    AgriLabor Connect
                  </Link>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant="ghost"
                      size="sm"
                      className="hover:bg-primary-foreground/10 hover:text-primary-foreground"
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <AuthButton />
                </div>
                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu}>
                  {isMobileMenuOpen ? <X /> : <Menu />}
                </Button>
              </div>
              {isMobileMenuOpen && (
                <div className="mt-4 md:hidden">
                  {navItems.map((item) => (
                    <Button
                      key={item.href}
                      asChild
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start mb-2 hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href={item.href}>
                        <item.icon className="mr-2 h-4 w-4" />
                        {item.label}
                      </Link>
                    </Button>
                  ))}
                  <div className="mt-2">
                    <AuthButton />
                  </div>
                </div>
              )}
            </div>
          </nav>
          <main className="w-full overflow-x-hidden">{children}</main>
        </AuthProvider>
      </body>
    </html>
  )
}
