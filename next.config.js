/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // NEXT_PUBLIC_BASE_URL: 'http://localhost:3089',
    // NEXT_PUBLIC_SOCKET_URL: 'ws://localhost:3089/graphql',

    NEXT_PUBLIC_BASE_URL: 'http://34.143.180.16:3089',
    NEXT_PUBLIC_SOCKET_URL: 'ws://34.143.180.16:3089/graphql',
    // NEXT_BASE_API_URL: 'https://getway.abeesdev.site',
  },
};

module.exports = nextConfig;
