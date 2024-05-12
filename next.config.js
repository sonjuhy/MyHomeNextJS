/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: ".",
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
    ];
  },
};
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "production" ? false : true,
});
module.exports = withPWA(nextConfig);
