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
    // Remove the missingSuspenseWithCSRBailout option which is causing warnings
  },
  // Add configuration to handle specific modules or paths causing issues
  webpack: (config, { isServer }) => {
    // Handle modules that might be using document or window
    if (isServer) {
      // Add any server-side module exceptions here if needed
    }
    return config;
  },
};

module.exports = nextConfig;