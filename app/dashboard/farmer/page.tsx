"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, CreditCard, ShieldCheck, Briefcase, FileText } from "lucide-react"

// Mock data for posted jobs
const postedJobs = [
  { id: 1, title: "Harvest Helper", applications: 5, status: "Open" },
  { id: 2, title: "Tractor Operator", applications: 3, status: "Closed" },
  { id: 3, title: "Fruit Picker", applications: 7, status: "Open" },
]

export default function FarmerDashboard() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "farmer") {
      router.push("/login")
    } else {
      setUserRole(role)
    }
  }, [router])

  if (!userRole) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Farmer Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Button onClick={() => router.push("/post-job")} className="w-full">
          <PlusCircle className="mr-2 h-4 w-4" /> Post New Job
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/payments">
            <CreditCard className="mr-2 h-4 w-4" /> Payments & Transactions
          </Link>
        </Button>
        {userRole === "admin" && (
          <Button asChild variant="outline" className="w-full">
            <Link href="/admin">
              <ShieldCheck className="mr-2 h-4 w-4" /> Admin Panel
            </Link>
          </Button>
        )}
      </div>
      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs">
            <Briefcase className="mr-2 h-4 w-4" /> Posted Jobs
          </TabsTrigger>
          <TabsTrigger value="applications">
            <FileText className="mr-2 h-4 w-4" /> Applications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>Your Posted Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Applications</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {postedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.applications}</TableCell>
                      <TableCell>
                        <Badge variant={job.status === "Open" ? "default" : "secondary"}>{job.status}</Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No recent applications.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

