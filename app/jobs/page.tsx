"use client"

import { useState } from "react"
import { useJobs } from "@/hooks/useJobs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { MapPin, DollarSign, Calendar, Loader2 } from "lucide-react"
import { BackButton } from "@/components/back-button"
import { format } from "date-fns"

interface Job {
  _id: string
  title: string
  location: string
  paymentType: string
  amount: number
  skills: string[]
  startDate: string
  endDate: string
}

export default function JobListings() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedJobType, setSelectedJobType] = useState("")
  const [selectedPaymentType, setSelectedPaymentType] = useState("")
  const [distance, setDistance] = useState([50])

  const { jobs, isLoading, error } = useJobs({
    searchTerm,
    jobType: selectedJobType,
    paymentType: selectedPaymentType,
    distance: distance[0]
  })

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <BackButton className="mb-6" />
        <h1 className="text-3xl font-bold text-center mb-8">Available Farm Jobs</h1>

        <div className="grid gap-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="md:w-1/3"
            />
            <Select value={selectedJobType} onValueChange={setSelectedJobType}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="harvest">Harvest</SelectItem>
                <SelectItem value="livestock">Livestock</SelectItem>
                <SelectItem value="machinery">Machinery</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPaymentType} onValueChange={setSelectedPaymentType}>
              <SelectTrigger className="md:w-1/4">
                <SelectValue placeholder="Payment Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Distance (miles)</label>
            <Slider
              value={distance}
              onValueChange={setDistance}
              max={100}
              step={1}
              className="w-full md:w-1/2"
            />
            <span className="text-sm text-muted-foreground">Within {distance} miles</span>
          </div>
        </div>

        {error && (
          <div className="bg-destructive/10 text-destructive p-4 rounded-lg mb-8">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <Card key={job._id}>
                <CardHeader>
                  <CardTitle className="line-clamp-2">{job.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>{job.paymentType === 'fixed' ? `₹${job.amount}` : `₹${job.amount}/${job.paymentType}`}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{format(new Date(job.startDate), 'MMM d')} - {format(new Date(job.endDate), 'MMM d, yyyy')}</span>
                    </div>
                    {job.skills && job.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    <Button className="w-full" asChild>
                      <a href={`/jobs/${job._id}`}>View Details</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
