/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    // BASE_URL: 'http://localhost:8080',
    BASE_URL: '',
  },
  async rewrites(){
    return[
      {
        source: '/:path*',
        destination: 'http://192.168.0.254:8081/:path*',
      },
    ];
  },
  // image: {
  //   domains: ['http://localhost:8080/file']
  // },
}

module.exports = nextConfig
