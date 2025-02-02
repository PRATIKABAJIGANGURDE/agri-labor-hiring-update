import { BackButton } from "@/components/back-button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton className="mt-4" />
      <h1 className="text-3xl font-bold mb-6">About AgriLabor Connect</h1>
      <div className="prose max-w-none">
        <p>
          AgriLabor Connect is a platform dedicated to bridging the gap between farmers and agricultural workers. Our
          mission is to create a seamless connection that benefits both parties, ensuring farms have access to skilled
          labor when they need it most, and workers can find reliable employment opportunities in the agricultural
          sector.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Our Vision</h2>
        <p>
          We envision a future where the agricultural labor market is efficient, transparent, and beneficial for all
          involved. By leveraging technology, we aim to solve the challenges of seasonal labor shortages and create a
          more stable work environment for agricultural workers.
        </p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">What We Offer</h2>
        <ul className="list-disc pl-6">
          <li>A user-friendly platform for posting and finding agricultural jobs</li>
          <li>Verified profiles for both farmers and workers</li>
          <li>Skill-matching algorithms to connect the right workers with the right jobs</li>
          <li>Secure payment systems and contract management</li>
          <li>Resources and support for both farmers and workers</li>
        </ul>
        <p className="mt-6">
          Join us in revolutionizing the agricultural labor market. Whether you're a farmer looking for reliable help or
          a worker seeking opportunities in agriculture, AgriLabor Connect is here to support you every step of the way.
        </p>
      </div>
    </div>
  )
}

