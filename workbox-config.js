module.exports = {
  globDirectory: "dist/",
  globPatterns: ["**/*.{css,png,jpg,html,js,json,txt}"],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  swDest: "dist/sw.js",
  workboxPluginMode: "GenerateSW",
  navigateFallback: "/index.html",
  runtimeCaching: [
    {
      urlPattern: new RegExp("^https://firebasestorage.googleapis.com/"),

      handler: "cacheFirst",
      options: {
        networkTimeoutSeconds: 20,
        cacheName: "firebase-image",
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 86400,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
  ],
};
