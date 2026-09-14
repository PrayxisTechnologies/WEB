/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // Allows production builds to successfully complete even if there are subtle type warnings
    ignoreBuildErrors: true,
  },
  eslint: {
    // Don't fail production build on linter warnings
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true
  },
  webpack: (config) => {
    return config;
  }
};

export default nextConfig;
