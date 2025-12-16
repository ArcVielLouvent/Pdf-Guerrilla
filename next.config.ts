import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Memberitahu webpack untuk mengabaikan module 'canvas'
    config.resolve.alias.canvas = false;
    
    // Tambahan untuk module encoding jika diperlukan nanti
    config.resolve.alias.encoding = false;

    return config;
  },
};

export default nextConfig;