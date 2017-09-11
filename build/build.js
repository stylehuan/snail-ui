/**
 * @build
 * @author  stylehuan
 * @create  2017-04-11 16:01
 */
var ora = require('ora');
var chalk = require('chalk');
var webpack = require('webpack');
var spinner = ora('building...');
spinner.start();
var argv = require('yargs').argv;
var webpackConfig = argv.a ? require('./webpack.all.conf') : require('./webpack.entry.conf');

webpack(webpackConfig, function (err, stats) {
    spinner.stop();
    if (err) throw err
    process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
    ))
})