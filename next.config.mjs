/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@assistant-ui/react"],
  experimental: {
    dynamicIO: true,
  },
};

export default nextConfig;