import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // This disables image optimization only in development mode
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
