/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['localhost', 'your-s3-bucket.s3.amazonaws.com'],
    unoptimized: false,
  },
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  // AWS-specific optimizations
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
}

module.exports = nextConfig
