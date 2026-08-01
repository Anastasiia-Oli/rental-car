import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ac.goit.global',
      },
    ],
  },
  /* config options here */
  // reactCompiler: true, disabled for now, as it may cause issues with form inputs
};

export default nextConfig;
