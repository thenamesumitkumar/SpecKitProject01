/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // For static export
  },
  output: "export", // Enable static export
  basePath: "", // Set to /app if deploying as a subpath
};

module.exports = nextConfig;
