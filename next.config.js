/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_BASE_API_URL: 'https://getway.abeesdev.site',
  },
};

module.exports = nextConfig;
