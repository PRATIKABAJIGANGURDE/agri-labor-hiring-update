"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Calendar, MapPin } from "lucide-react"

// Mock data for applied jobs
const appliedJobs = [
  { id: 1, title: "Harvest Helper", location: "Springfield, IL", startDate: "2023-07-01", status: "Pending" },
  { id: 2, title: "Tractor Operator", location: "Bloomington, IN", startDate: "2023-07-15", status: "Accepted" },
  { id: 3, title: "Livestock Caretaker", location: "Des Moines, IA", startDate: "2023-08-01", status: "Completed" },
]

export default function Applications() {
  const [jobs, setJobs] = useState(appliedJobs)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Accepted":
        return "bg-green-100 text-green-800"
      case "Completed":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Job Applications</h1>
      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{job.title}</span>
                <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="mr-2 h-4 w-4" />
                {job.location}
              </div>
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <Calendar className="mr-2 h-4 w-4" />
                Start Date: {job.startDate}
              </div>
              <Button className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Farmer
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

