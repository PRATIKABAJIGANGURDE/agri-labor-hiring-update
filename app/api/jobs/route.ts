import clientPromise from "@/lib/mongodb"

export async function POST(request: Request) {
  try {
    const client = await clientPromise
    const db = client.db("agri")
    const { title, description, location, skills, paymentType, amount, startDate, endDate } = await request.json()

    const job = {
      title,
      description,
      location,
      skills,
      paymentType,
      amount,
      startDate,
      endDate,
      createdAt: new Date(),
    }

    const result = await db.collection("jobs").insertOne(job)

    return NextResponse.json({ message: "Job created successfully", jobId: result.insertedId }, { status: 201 })
  } catch (e) {
    console.error("Error in POST /api/jobs:", e)
    return NextResponse.json({ message: "Error creating job. Please check your database connection." }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchTerm = searchParams.get('search')
    const jobType = searchParams.get('jobType')
    const paymentType = searchParams.get('paymentType')
    const maxDistance = searchParams.get('distance')

    const client = await clientPromise
    const db = client.db("agri")

    let query: any = {}

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } },
        { skills: { $in: [new RegExp(searchTerm, 'i')] } }
      ]
    }

    if (jobType) {
      query.jobType = jobType
    }

    if (paymentType) {
      query.paymentType = paymentType
    }

    const jobs = await db.collection("jobs")
      .find(query)
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(jobs)
  } catch (e) {
    console.error("Error in GET /api/jobs:", e)
    return NextResponse.json(
      { message: "Error fetching jobs. Please try again later." },
      { status: 500 }
    )
  }
}
