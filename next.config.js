/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.SERVER_ADDRESS,
  },
  async rewrites(){
    return[
      {
        source: '/:path*',
        destination: process.env.SERVER_ADDRESS+'/:path*',
      },
    ];
  },
}

module.exports = nextConfig
