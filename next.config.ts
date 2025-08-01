import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  basePath: "/admin",
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
