import { useState, useEffect } from 'react'

interface Job {
  _id: string
  title: string
  location: string
  paymentType: string
  amount: number
  skills: string[]
  startDate: string
  endDate: string
  description: string
}

interface UseJobsOptions {
  searchTerm?: string
  jobType?: string
  paymentType?: string
  distance?: number
}

export function useJobs(options: UseJobsOptions = {}) {
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const params = new URLSearchParams()
        if (options.searchTerm) params.set('search', options.searchTerm)
        if (options.jobType) params.set('jobType', options.jobType)
        if (options.paymentType) params.set('paymentType', options.paymentType)
        if (options.distance) params.set('distance', options.distance.toString())

        const response = await fetch(`/api/jobs?${params.toString()}`)
        if (!response.ok) {
          throw new Error('Failed to fetch jobs')
        }

        const data = await response.json()
        setJobs(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchJobs()
  }, [options.searchTerm, options.jobType, options.paymentType, options.distance])

  return { jobs, isLoading, error }
}
