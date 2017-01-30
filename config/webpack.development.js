/**
 * @author Merigo
 * @description 
 * WebPack default configuration file -- define settings for <development> enviroment.  
 * @returns
 * Default modules object for webpack
 */
'use strict';

var path = require('path');
var webpack = require('webpack');
var defaultConfig = require('./webpack.default');

console.log('Load development enviroment config');

var config = Object.assign({},defaultConfig,{
    watch : false,
    devtool :"source-map",
    debug: true,
    devServer: {
        host: "localhost",
        port: "3000"
    },
    api : {
        client : {
            url : "/neomas",
            proxy : "https://openacc.ofc.ru"
        }
    }
});

config.stats = config.stats || {};

//add output information about the reasons why modules are included
config.stats.reasons = true; 

//define plugins
config.plugins = config.plugins || [] 
config.plugins.push(new webpack.HotModuleReplacementPlugin());
 
module.exports =  config;