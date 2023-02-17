/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const { merge } = require("webpack-merge");

const fs = require("fs");
const common_file = fs.existsSync("./webpack.vue.js") ? "./webpack.vue.js" : "./webpack.common.js";
const common = require(common_file);

const { cache } = require("webpack");


// eslint-disable-next-line no-undef
module.exports = merge(common.config, {
  mode: "development",
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "public"),
  },
  devtool: "inline-source-map",
  /*cache: {
    type: "filesystem",
    buildDependencies: {
      // config: [__filename],
    },
  },*/
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    host: "0.0.0.0",
    port: "8080",
  }
});
