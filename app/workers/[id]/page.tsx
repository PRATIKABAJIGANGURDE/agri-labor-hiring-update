import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Calendar } from "lucide-react"

// Mock data for worker profile
const workerProfile = {
  id: "1",
  name: "John Doe",
  picture: "/placeholder.svg",
  location: "Springfield, IL",
  skills: ["Harvesting", "Planting", "Machinery Operation"],
  experience: 5,
  availability: "Active",
  rating: 4.5,
  reviews: [
    { id: 1, author: "Farm Owner 1", rating: 5, comment: "Excellent worker, very reliable." },
    { id: 2, author: "Farm Owner 2", rating: 4, comment: "Good work ethic, would hire again." },
  ],
}

export default function WorkerProfile({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Image
              src={workerProfile.picture || "/placeholder.svg"}
              alt={workerProfile.name}
              width={100}
              height={100}
              className="rounded-full"
            />
            <div>
              <CardTitle className="text-2xl">{workerProfile.name}</CardTitle>
              <p className="flex items-center text-gray-600">
                <MapPin className="mr-2 h-4 w-4" /> {workerProfile.location}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {workerProfile.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Experience</h3>
            <p>{workerProfile.experience} years in farming</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Availability</h3>
            <Badge variant={workerProfile.availability === "Active" ? "success" : "destructive"}>
              {workerProfile.availability}
            </Badge>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Rating</h3>
            <div className="flex items-center">
              <Star className="text-yellow-400 mr-1" />
              <span>{workerProfile.rating.toFixed(1)}</span>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Reviews</h3>
            {workerProfile.reviews.map((review) => (
              <div key={review.id} className="mb-4">
                <div className="flex items-center mb-1">
                  <Star className="text-yellow-400 mr-1" />
                  <span>{review.rating}</span>
                  <span className="ml-2 font-medium">{review.author}</span>
                </div>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
          <Button className="w-full">Hire Now</Button>
        </CardContent>
      </Card>
    </div>
  )
}

