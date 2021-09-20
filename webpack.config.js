// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require("path");

module.exports = {
  mode: "none",
  entry: {
    index: "./src/app/js/app.js",
    detail: "./src/app/js/detail.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_bundle.js",
  },
};
