/**
 * @webpack.conf.all
 * @author  stylehuan
 * @create  2017-04-19 13:39
 */

var baseWebpackConfig = require('./webpack.base.conf');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var extractCSS = new ExtractTextPlugin('[name]/style.css');

module.exports = merge(baseWebpackConfig, {
    entry: {
        "snail-button": "./packages/snail-button"
    },
    output: {
        filename: '[name]/index.js'
    },
    plugins: [extractCSS]
});
