/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // BASE_URL: 'http://localhost:8080',
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
  // image: {
  //   domains: ['http://localhost:8080/file']
  // },
}

module.exports = nextConfig
