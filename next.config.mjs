/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  turbopack: {},
  // polling watcher: native file events don't reach HMR under Windows/Docker/WSL
  watchOptions: {
    pollIntervalMs: 300,
  },
};

export default nextConfig;
