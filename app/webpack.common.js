/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");

const entries = require("./webpack.entries.js");
const rules = require("./webpack.rules.js");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const RemoveEmptyScriptsPlugin = require("webpack-remove-empty-scripts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { cache } = require("webpack");



const getEntriesJs = (es) => {
  let res = {};
  es.forEach((v) => { if(v?.js?.filename) res[v.js.filename] = `${entries.includeDir}/${entries.jsRoot}/${v.js.src}`} );
  return res; 
};

const getEntriesCss = (es) => {
  let res = {};
  es.forEach((v) => { if(v?.css?.filename) res[v.css.filename] = `${entries.includeDir}/${entries.cssRoot}/${v.css.src}`} );
  return res; 
};

const getEntriesHtml = (es) => {
  return es.map(v => new HtmlWebpackPlugin({
    filename: v.html.filename, 
    template: path.resolve(__dirname, entries.includeDir, entries.htmlRoot, v.html.filename),
    chunks: [v?.js?.filename, v?.css?.filename]
  }));
};




// eslint-disable-next-line no-undef
module.exports = { 
  config: {
    entry: {...getEntriesJs(entries.entries), ...getEntriesCss(entries.entries)},
    module: {
      rules: [rules.tsRule, rules.sassRule, rules.htmlRule, rules.imageRule, rules.yamlRule],
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json", ".css", ".scss", ".sass"],
    },
    target: ["web", "es5"],
    plugins: [
      new CleanWebpackPlugin(),
      new WebpackManifestPlugin({
        fileName: "manifest.json",
        writeToFileEmit: true,
      }),
      new MiniCssExtractPlugin({
        filename: "[name].bundle.css",
      }),
      new RemoveEmptyScriptsPlugin(),
      ...getEntriesHtml(entries.entries),
    ],
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};
