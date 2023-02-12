/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const entries = require("./webpack.entries.js");

// Setting of TypeScript Rule
/**
 * ts-loader compiles all files by default (uselessly).
 * This causes even files not needed for bundling, such as test files, to be compiled.
 * To avoid this, set options.onlyCompileBundledFiles as follows
 *
 * https://stackoverflow.com/questions/41289265/webpack-ts-loader-compiling-all-files-when-i-only-want-it-to-run-in-one-folder-f
 */

// TypeScript rule
const tsRule = {
    test: /\.tsx?$/,
    include: path.resolve(__dirname, entries.includeDir, entries.jsRoot),
    use: [{ loader: "ts-loader", options: { onlyCompileBundledFiles: true, appendTsSuffixTo: [/\.vue$/] } }],
};

// SASS to CSS rule
const sassRule = {
    test: /(?<!\.vue)\.(sa|sc|c)ss$/,
    include: path.resolve(__dirname, entries.includeDir, entries.cssRoot),
    use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
};

// HTML rule
const htmlRule = {
    test: /\.html$/,
    include: path.resolve(__dirname, entries.includeDir, entries.htmlRoot),
    use: [{loader: "html-loader"}],
};

// image resource rule
const imageRule = {
    test: /\.(jpe?g|png|gif|webp)$/,
    type: "asset",
    generator: {
        filename: "images/[name]-[ext]-[hash]",
    },
    parser: {
        dataUrlCondition: {
            maxSize: 8 * 1024 // 8kiB
        }
    },
};

// yaml rule
const yamlRule = {
    test: /\.ya?ml$/,
    type: "json",
    use: "yaml-loader",
};


  // eslint-disable-next-line no-undef
module.exports = {
    tsRule, sassRule, htmlRule, imageRule, yamlRule
};
