/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: false,
  env: {
    BASE_URL: process.env.SERVER_ADDRESS,
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: process.env.SERVER_ADDRESS + "/:path*",
      },
      {
        source: "/myhomeLog/:path*",
        destination: "http://127.0.0.1:3002/myhomeLog/:path*",
      },
    ];
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "production" ? false : true,
});
module.exports = withPWA(nextConfig);
