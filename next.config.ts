import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // For static export
  },
  output: "export", // Enable static export
  basePath: "", // Set to /app if deploying as a subpath
  experimental: {
    optimizePackageImports: ["date-fns"],
  },
};

export default nextConfig;
