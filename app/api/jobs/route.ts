import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: Request) {
  try {
    const { title, description, location, skills, paymentType, amount, startDate, endDate } = await request.json()

    const { data: job, error } = await supabase
      .from("jobs")
      .insert([{
        title,
        description,
        location,
        skills,
        payment_type: paymentType,
        amount,
        start_date: startDate,
        end_date: endDate,
        created_at: new Date().toISOString()
      }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ message: "Job created successfully", job }, { status: 201 })
  } catch (e) {
    console.error("Error in POST /api/jobs:", e)
    return NextResponse.json({ message: "Error creating job" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get('search')
    const jobType = searchParams.get('jobType')
    const paymentType = searchParams.get('paymentType')
    const maxDistance = searchParams.get('distance')

    let query = supabase
      .from("jobs")
      .select("*")

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
    }

    if (jobType) {
      query = query.eq('job_type', jobType)
    }

    if (paymentType) {
      query = query.eq('payment_type', paymentType)
    }

    // Note: For distance-based queries, you'll need PostGIS extension in Supabase
    // This is a simplified version without distance calculation
    
    const { data: jobs, error } = await query
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(jobs)
  } catch (e) {
    console.error("Error in GET /api/jobs:", e)
    return NextResponse.json({ message: "Error fetching jobs" }, { status: 500 })
  }
}
