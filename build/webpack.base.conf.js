/**
 * @webpack.base.conf
 * @author  stylehuan
 * @create  2017-04-19 13:49
 */
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var px2rem = require("postcss-plugin-px2rem");
var postCssConf = require("./postcss.conf");
// var eslintFriendlyFormatter = require('eslint-friendly-formatter')
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    output: {
        path: path.resolve(__dirname, '../lib')
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'src': resolve('src'),
            'pkg': resolve('packages')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        css: ExtractTextPlugin.extract({
                            loader: ['css-loader'],
                            fallbackLoader: 'vue-style-loader'
                        }),
                        postcss: ExtractTextPlugin.extract({
                            loader: ['css-loader'],
                            fallbackLoader: 'vue-style-loader'
                        }),
                        less: ExtractTextPlugin.extract({
                            loader: ['css-loader', 'less-loader'],
                            fallbackLoader: 'vue-style-loader'
                        })
                    },
                    postcss: [
                        require('autoprefixer')(),
                        px2rem(postCssConf)
                    ]
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.mp3$/,
                loader: 'file-loader',
                query: {
                    name: 'sounds/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
}