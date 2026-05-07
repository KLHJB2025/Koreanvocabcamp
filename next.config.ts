import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',       // static export for Firebase Hosting
  images: {
    unoptimized: true,    // required for static export (no Next.js image server)
  },
};

export default nextConfig;
