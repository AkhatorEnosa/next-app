import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lh3.googleusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knutsoncasey.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.berther-bueromoebel.ch',
        port: '',
      }
    ],
  },
};

export default nextConfig;
