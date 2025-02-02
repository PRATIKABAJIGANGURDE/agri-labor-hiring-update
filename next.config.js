/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  distDir: 'dist',
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
    ignoreBuildErrors: false, // Set to true only if you want to deploy despite TS errors
  },
  eslint: {
    ignoreDuringBuilds: false, // Set to true only if you want to deploy despite ESLint errors
  },
  outputFileTracingRoot: process.cwd(), // For better standalone output
}

module.exports = nextConfig
