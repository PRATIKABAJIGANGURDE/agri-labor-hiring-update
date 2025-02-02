/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'lh3.googleusercontent.com', // For Google OAuth profile pictures
      'www.google.com', // For Google logo
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true, // Temporarily set to true to identify build issues
  },
  eslint: {
    ignoreDuringBuilds: true, // Temporarily set to true to identify build issues
  }
}

module.exports = nextConfig
