/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');
const nextConfig = {
  reactStrictMode: true,
  i18n,
  async redirects() {
        return [
            {
                source: '/',
                destination: '/orders',
                basePath: false,
                permanent: false
            }
        ]
    }
}

module.exports = nextConfig
