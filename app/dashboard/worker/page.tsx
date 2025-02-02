"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, CreditCard, Briefcase, BookmarkPlus } from "lucide-react"

// Mock data for applied jobs
const appliedJobs = [
  { id: 1, title: "Harvest Helper", farmer: "John Doe", status: "Pending" },
  { id: 2, title: "Tractor Operator", farmer: "Jane Smith", status: "Accepted" },
  { id: 3, title: "Fruit Picker", farmer: "Bob Johnson", status: "Rejected" },
]

export default function WorkerDashboard() {
  const router = useRouter()
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    if (role !== "worker") {
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
      <h1 className="text-2xl font-bold mb-6">Worker Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Button onClick={() => router.push("/jobs")} className="w-full">
          <Search className="mr-2 h-4 w-4" /> Find Jobs
        </Button>
        <Button asChild variant="outline" className="w-full">
          <Link href="/payments">
            <CreditCard className="mr-2 h-4 w-4" /> Payments & Transactions
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="applications">
            <Briefcase className="mr-2 h-4 w-4" /> My Applications
          </TabsTrigger>
          <TabsTrigger value="saved">
            <BookmarkPlus className="mr-2 h-4 w-4" /> Saved Jobs
          </TabsTrigger>
        </TabsList>
        <TabsContent value="applications">
          <Card>
            <CardHeader>
              <CardTitle>Your Job Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Job Title</TableHead>
                    <TableHead>Farmer</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appliedJobs.map((job) => (
                    <TableRow key={job.id}>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.farmer}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            job.status === "Accepted"
                              ? "default"
                              : job.status === "Rejected"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {job.status}
                        </Badge>
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
        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <p>No saved jobs.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

