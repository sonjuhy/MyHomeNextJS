/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: false,
  env: {
    BASE_URL: '',
  },
  async rewrites(){
    return[
      {
        source: '/:path*',
        destination: 'http://192.168.0.18:8080/:path*',
      },
    ];
  },
}

module.exports = nextConfig
