/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "sw.js",
});

const nextConfig = withPWA({
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;
