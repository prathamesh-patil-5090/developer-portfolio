const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'i.ibb.co'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Removing experimental features to simplify config
  experimental: {
    // Only keeping the optimizeCss option
    optimizeCss: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;