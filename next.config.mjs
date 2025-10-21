/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ["@assistant-ui/react"],
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: undefined,
  },
};

export default nextConfig;