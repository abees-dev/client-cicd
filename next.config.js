/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BASE_URL: 'http://localhost:3089/graphql',
    NEXT_PUBLIC_SOCKET_URL: 'ws://localhost:3089/graphql',
  },
};

module.exports = nextConfig;
