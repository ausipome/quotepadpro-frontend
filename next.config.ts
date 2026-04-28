import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "quotepad-images-840315891354-eu-west-2-an.s3.eu-west-2.amazonaws.com",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;