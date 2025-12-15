import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'old-images.hb.ru-msk.vkcs.cloud',
      },
    ],
  },
};

export default nextConfig;
