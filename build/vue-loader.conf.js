var px2rem = require("postcss-plugin-px2rem");
var postCssConf = require("./postcss.conf");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('[name]/[name].css');
module.exports = {
    loaders: {
        css: extractCSS.extract(['css-loader']),
        postcss: "vue-style-loader!css-loader",
        less: "vue-style-loader!css-loader!less-loader",
    },
    postcss: [
        require('autoprefixer')(),
        px2rem(postCssConf)
    ]
}
