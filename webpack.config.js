// webpack.config.js
// `webpack` command will pick up this config setup by default
var path = require("path");

module.exports = {
  mode: "none",
  entry: {
    index: "./src/app/js/index.js",
    search: "./src/app/js/search.js",
    detail: "./src/app/js/detail.js",
    bookmark: "./src/app/js/bookmark.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name]_bundle.js",
  },
};
