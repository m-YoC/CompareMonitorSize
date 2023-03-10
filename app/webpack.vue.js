const path = require("path");
const common = require("./webpack.common.js");
const entries = require("./webpack.entries.js");
const rules = require("./webpack.rules.js");
const { VueLoaderPlugin } = require("vue-loader");

// 
const vueRemoveDataTestIdOption = (astEl) => {
    const key = 'data-testid';
    const { attrsMap, attrsList } = astEl;

    if (attrsMap[key]) {
        delete attrsMap[key];
        const index = attrsList.findIndex((x) => x.name === key);
        attrsList.splice(index, 1);
    }

    return astEl;
};

const vueRuleOptions = {
    compilerOptions: { modules: [
        { preTransformNode: vueRemoveDataTestIdOption}
    ]}
};

// vue component rule
const vueRule = {
    test: /\.vue$/,
    use: [{ loader: "vue-loader" }],
};

// vue SASS to CSS rule
const vueSassRule = {
    test: /\.vue\.(sa|sc|c)ss$/,
    use: ["vue-style-loader", "css-loader", "sass-loader"],
};

let common_vue = common;

common_vue.config.module.rules = [vueRule, vueSassRule, ...common_vue.config.module.rules];
common_vue.config.resolve.extensions.push(".vue");
common_vue.config.plugins.push(new VueLoaderPlugin());

module.exports = common_vue;
