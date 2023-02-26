/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const version = require("./package.json").version;
const path = require("path");
const { merge } = require("webpack-merge");

const fs = require("fs");
const common_file = fs.existsSync("./webpack.vue.js") ? "./webpack.vue.js" : "./webpack.common.js";
const common = require(common_file);

const { cache } = require("webpack");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// eslint-disable-next-line no-undef
module.exports = merge(common.config, {
  mode: "production",
  output: {
    filename: "[name]-[fullhash].bundle.js",
    path: path.resolve(__dirname, `../public`),
  },
  performance: {
    maxEntrypointSize: 2000000,
    maxAssetSize: 2000000,
    hints: false,
  },
  optimization: {
    minimizer: [
      "...", // Needed to keep js files compressed
      new CssMinimizerPlugin(),
    ],
  },
});
