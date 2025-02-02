import { NextResponse } from "next/server"
import { ObjectId } from "mongodb"
import clientPromise from "@/lib/mongodb"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise
    const db = client.db("agri")

    const job = await db.collection("jobs").findOne({
      _id: new ObjectId(params.id)
    })

    if (!job) {
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
