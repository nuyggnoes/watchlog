/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['image.tmdb.org', 'placeholder.com'],
    unoptimized: true,
  },
  experimental: {
    serverActions: true,
  },
}

export default nextConfig
