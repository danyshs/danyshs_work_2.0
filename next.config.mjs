// next.config.mjs
export default {
  reactStrictMode: true,
  turbopack: {},
  // Enable polling file watcher for Turbopack HMR
  // This fixes HMR not working in Windows/Docker/WSL environments
  watchOptions: {
    pollIntervalMs: 300,
  },
};
