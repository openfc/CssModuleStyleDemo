/**
 * @author Merigo
 * @description
 * WebPack default configuration file -- define settings for all environment.
 * To avoid using "./" while specifying module id , add "." value to "resolve.modulesDirectories" configuration parameter array (so
 * you can use "home.js" in place of "./home.js")
 * @returns
 * Default modules object for webpack
 */
'use strict';

var path = require('path');
var webpack = require('webpack');

//Plugins
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var stylelint = require('stylelint');
var autoprefixer = require('autoprefixer');

var stylelintConfig = require('./stylelint.config');

console.log('start loading default config');

var extractCSS = new ExtractTextPlugin(
                        '[name]-[chunkhash].css',
                        {
                            allChunks : true,
                            disable : false
                        }
);

// Environment and option shortcuts
var VERBOSE = (process.argv.indexOf('--verbose') >= 0);
var BASE_PATH = process.env.__WEBPACK_BASE_PATH__ || path.join(__dirname, '/../');
var SRC_PATH = process.env.__WEBPACK_APP_SRC__ || path.join(BASE_PATH, '/src');
var BUILD_PATH = process.env.__WEBPACK_BUILD_PATH__ || path.join(BASE_PATH, 'build');
var TEMP_PATH = process.env.__WEBPACK_TEMP_PATH__ || path.join(BASE_PATH, 'tmp');

module.exports =  {
    context: BASE_PATH, // the same meaning as RequireJS "baseURL"
    entry: {
        main: './src/index.jsx'
    },
    output: {
        path: BUILD_PATH,   //Build path. Must be absolute path
        publicPath: '',                     //Path for browser
        filename: '[name].js'               //Bundle file name. The [name] equals entry.{name} property name
    },

    resolve: {
        extensions : ['','.js','.jsx','.json'],
        root: [SRC_PATH],
        modulesDirectories: [
            ".", "node_modules"
        ]
    },

    watch : false,
    devtool : false,
    ssl: false,

    // Setup compile-time output options
    // https://github.com/webpack/docs/wiki/node.js-api#stats
    stats: {
        colors: true,
        hash: VERBOSE,
        version: VERBOSE,
        timings: true,
        modules: VERBOSE,
        chunks: VERBOSE,
        chunkModules: VERBOSE,
        cached: VERBOSE,
        cachedAssets: VERBOSE
    },

    module: {
        preLoaders: [
			{
				test: /\.jsx?$/,
				loaders: ['eslint'],
				include: SRC_PATH,
				exclude: /node_modules/
			}
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components|web_modules)/,
                loader: 'babel',
                //passing options to the loader
                query: {
                    //presets: ['react','es2015'],
                    cacheDirectory: path.join(TEMP_PATH,'babel')
                }
            },
            {
                test: /\.css$/,
                loader: extractCSS.extract('style','css?camelCase&sourceMap&modules&importLoaders=1&localIdentName=[path][name]--[local]!postcss'),
				exclude: /node_modules/
            },
            {
                test: /\.less/,
                loader:  extractCSS.extract('style', 'css?root=.?modules&importLoaders&sourceMap!less!postcss'),
				exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                include: /\/node_modules\//,
                loader: 'file?name=[1].[ext]&regExp=node_modules/(.*)'
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /\/node_modules\//,
                loader: 'url?name=[path][name].[ext]&limit=4000'
            },
			{
                test: /\.svg/,
                loader: 'url?name=[path][name].[ext]&limit=4000&mimetype=image/svg+xml'
            },
            {
                test: /\.(woff|woff2)/,
                loader: "url?name=[path][name].[ext]&limit=10000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|otf)/,
                loader: "url?name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream"
            },
            {
                test: /\.eot/,
                loader: "file?name=[path][name].[ext]"
            },
            {
                test: /\.json$/,
                loader: "json"
            }
        ]
    },
    postcss: [
        stylelint(stylelintConfig),
        autoprefixer({ browsers: ['last 4 versions'] })
    ],
    plugins: [
        extractCSS,
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
		new CleanWebpackPlugin([path.parse(BUILD_PATH).base, path.parse(TEMP_PATH).base], {
		  root: BASE_PATH,
		  verbose: VERBOSE
		})
    ]
}
