import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Enable React Strict Mode for development

  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY, // Expose Resend API key to your app
    MONGODB_URI: process.env.MONGODB_URI, // Expose MongoDB URI
    TOKEN_SECRET: process.env.TOKEN_SECRET, // Expose Token Secret if needed
  },
};

export default nextConfig;
