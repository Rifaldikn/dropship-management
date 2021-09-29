// Inside of webpack.config.js:
const { InjectManifest } = require("workbox-webpack-plugin");

module.exports = {
  // Other webpack config...
  plugins: [
    // Other plugins...
    new InjectManifest({ option: "value" }),
  ],
};
