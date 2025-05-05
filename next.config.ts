import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  serverActions: {
    bodySizeLimit: '4mb', // Increase the body size limit (e.g., to 4MB)
  },
  images: {
    // Allow serving images from the local filesystem
    // The default loader works for this, no need for remotePatterns
    // if the images are served from the public directory.
    // You might need remotePatterns if serving from external URLs.
  },
};

export default nextConfig;
