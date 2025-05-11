import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow images from any hostname
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "4.5mb", // Or any other value like 2097152 for 2MB in bytes
    },
  },
};

export default nextConfig;
