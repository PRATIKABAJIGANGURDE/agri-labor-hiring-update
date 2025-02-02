import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: job, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error || !job) {
      return NextResponse.json(
        { message: "Job not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(job)
  } catch (e) {
    console.error("Error in GET /api/jobs/[id]:", e)
    return NextResponse.json(
      { message: "Error fetching job details" },
      { status: 500 }
    )
  }
}
