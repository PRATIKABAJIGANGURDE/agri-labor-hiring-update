"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Briefcase, BookmarkCheck } from "lucide-react"

// Mock data
const farmerJobs = [
  { id: 1, title: "Harvest Helper Needed", applications: 5, status: "Open" },
  { id: 2, title: "Experienced Tractor Operator", applications: 3, status: "Closed" },
]

const workerJobs = [
  { id: 1, title: "Harvest Helper", status: "Applied" },
  { id: 2, title: "Livestock Caretaker", status: "Saved" },
]

const notifications = [
  { id: 1, message: "New application for Harvest Helper", type: "application" },
  { id: 2, message: "Payment received for last week's work", type: "payment" },
  { id: 3, message: "New message from John Farmer", type: "message" },
]

export default function Dashboard() {
  const [userType, setUserType] = useState<"farmer" | "worker">("farmer")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <Tabs defaultValue="jobs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          <Card>
            <CardHeader>
              <CardTitle>{userType === "farmer" ? "Posted Jobs" : "Applied & Saved Jobs"}</CardTitle>
            </CardHeader>
            <CardContent>
              {userType === "farmer"
                ? farmerJobs.map((job) => (
                    <div key={job.id} className="mb-4 p-4 border rounded">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant={job.status === "Open" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                      <p className="text-sm text-gray-500">Applications: {job.applications}</p>
                    </div>
                  ))
                : workerJobs.map((job) => (
                    <div key={job.id} className="mb-4 p-4 border rounded">
                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{job.title}</h3>
                        <Badge variant={job.status === "Applied" ? "default" : "secondary"}>{job.status}</Badge>
                      </div>
                    </div>
                  ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {notifications.map((notification) => (
                <div key={notification.id} className="mb-4 p-4 border rounded flex items-start">
                  {notification.type === "application" && <Briefcase className="mr-2 h-5 w-5 text-blue-500" />}
                  {notification.type === "payment" && <BookmarkCheck className="mr-2 h-5 w-5 text-green-500" />}
                  {notification.type === "message" && <Bell className="mr-2 h-5 w-5 text-yellow-500" />}
                  <p>{notification.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

