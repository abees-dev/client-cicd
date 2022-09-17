/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_BASE_API_URL: 'http://localhost:3080',
  },
};

module.exports = nextConfig;
