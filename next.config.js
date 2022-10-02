/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // NEXT_PUBLIC_BASE_URL: 'http://localhost:3089',
    // NEXT_PUBLIC_SOCKET_URL: 'ws://localhost:3089/graphql',

    NEXT_PUBLIC_BASE_URL: 'https://gateway.abeesdev.site',
    NEXT_PUBLIC_SOCKET_URL: 'ws://gateway.abeesdev.site/graphql',
    // NEXT_BASE_API_URL: 'https://getway.abeesdev.site',
  },
};

module.exports = nextConfig;
