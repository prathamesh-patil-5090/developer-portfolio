const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'i.ibb.co'],
    unoptimized: process.env.NODE_ENV !== 'production',
  },
  // Adding more verbose logging during build
  logging: {
    level: process.env.NODE_ENV === 'production' ? 'error' : 'verbose',
  },
  // Reduce memory usage during build
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;