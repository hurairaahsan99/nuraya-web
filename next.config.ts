import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "enduring-spirit-ce192413cd.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
