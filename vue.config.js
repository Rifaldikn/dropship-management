module.exports = {
  pwa: {
    themeColor: "#5A63DC",
    msTileColor: "#fff",
    manifestOptions: {
      name: "Dropship Management",
      short_name: "Dropship Management",
      theme_color: "#5A63DC",
      icons: [
        {
          src: "./img/icons/manifest-icon-192.png",
          type: "image/png",
          sizes: "192x192",
          purpose: "maskable any",
        },
        {
          src: "./img/icons/manifest-icon-512.png",
          type: "image/png",
          sizes: "512x512",
          purpose: "maskable any",
        },
      ],
      start_url: "/",
      display: "standalone",
      background_color: "#ffff",
      scope: "/",
    },
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
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
        {
          urlPattern: new RegExp("^https://image.flaticon.com/"),
          handler: "cacheFirst",
          options: {
            networkTimeoutSeconds: 20,
            cacheName: "flatticon-image",
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
    },
  },
};
