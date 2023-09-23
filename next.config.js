/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  images: {
    domains: ["yt3.ggpht.com", "lh3.googleusercontent.com"],
  },
  env: { mapbox_key: "" },
};

module.exports = nextConfig;
