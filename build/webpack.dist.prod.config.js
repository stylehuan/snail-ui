/**
 * @webpack.dev.config
 * @author  stylehuan
 * @create  2017-08-01 17:45
 */
var path = require("path");
var baseWebpackConfig = require('./webpack.base.conf');
var merge = require('webpack-merge');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = merge(baseWebpackConfig, {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: 'snail-ui.min.js',
        library: 'snail-ui',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'snail-ui.css'
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
});
