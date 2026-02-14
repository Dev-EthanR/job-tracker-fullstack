import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/application",
        permanent: true,
      },
      {
        source: "/",
        destination: "/application",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
