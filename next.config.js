/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "files.oprisor.dev" },
      { protocol: "https", hostname: "files.galitianu.com" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "www.pngwing.com" },
    ],
  },
};

module.exports = nextConfig;
