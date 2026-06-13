import type { NextConfig } from "next";

const BACKEND_URL =
  process.env.BACKEND_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://uychi-hub-backend-production.up.railway.app"
    : "http://127.0.0.1:8000");

const nextConfig: NextConfig = {
  skipTrailingSlashRedirect: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: `${BACKEND_URL}/api/:path*/`,
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*/`,
      },
    ];
  },
};

export default nextConfig;
