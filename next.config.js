/** @type {import('next').NextConfig} */
const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
});

module.exports = withPWA({
  experimental: {
    forceSwcTransforms: true,
  },
  reactStrictMode: false,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/(L|l)(O|o)(G|g)(I|i)(N|n)",
        destination: "/login",
      },
    ];
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

// const nextConfig = {
//   reactStrictMode: false,
//   swcMinify: true,
//   async rewrites() {
//     return [
//       {
//         source: "/(L|l)(O|o)(G|g)(I|i)(N|n)",
//         destination: "/login",
//       },
//     ];
//   },
// };

// module.exports = nextConfig;
