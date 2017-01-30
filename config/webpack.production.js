/**
 * @author Merigo
 * @description 
 * WebPack default configuration file -- define settings for <production> enviroment.  
 * @returns
 * Default modules object for webpack
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var defaultConfig = require('./webpack.default');

console.log('Load production enviroment config');

var config = Object.assign({},defaultConfig,{
    api : {
        client : {
            url : "/neomas"
        }
    }
});

//define plugins
config.plugins = config.plugins || []
config.plugins.push(new webpack.optimize.DedupePlugin());
config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }));

module.exports =  config;