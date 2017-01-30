/**
 * @author Merigo
 * @description 
 * WebPack main configuration file. 
 * 
 */

var path = require('path');
var webpack = require('webpack');
var pkg = require('./package.json');

console.log(pkg.version); 

// Define available environments
var enviroments = ['development','test','production'];

// Define application source code path
process.env.__WEBPACK_BASE_PATH__ = path.join(__dirname,'.');
process.env.__WEBPACK_APP_SRC__ = path.join(process.env.__WEBPACK_BASE_PATH__, 'src');
process.env.__WEBPACK_BUILD_PATH__ = path.join(__dirname, pkg.directories && pkg.directories.build ? pkg.directories.build : 'build');
process.env.__WEBPACK_TEMP_PATH__ = path.join(__dirname, pkg.directories && pkg.directories.temp ? pkg.directories.temp : 'tmp');
console.log(process.env.__WEBPACK_BUILD_PATH__);

var NODE_ENV = process.env.NODE_ENV || 'development';
//var ARGV = Array.prototype.push.apply(['--'],process.argv);
var ARGV = process.argv;


 
// Set current environment
// Command line args take precedence over 'NODE_ENV' environment variable
var ENV; 

(ENV = enviroments.reduce(function(env,arg,i){
      var user_env = ARGV.indexOf('--' + arg) >=0 ? arg : env;
      if (user_env && env && user_env !== env) {
          throw new Error('Too many enviroments specified');
      }
      return user_env; 
}, null), ENV || (ENV = NODE_ENV));

if (enviroments.indexOf(ENV) < 0) {
    throw new Error('Unknown environment specified');
}

console.log('Current environment = ['+ ENV +']');

// Environment and option short-cuts 
var TEST = ENV === 'test';
var DEBUG = ENV === 'development';
var VERBOSE = (ARGV.indexOf('--verbose') >= 0);


// Get environment configuration
var config = require(path.join(__dirname, 'config/webpack.' + ENV));

//Set object's property value
function assignProperty(obj, prop, value) {
    if (typeof prop === "string")
        prop = prop.split(".");

    if (prop.length > 1) {
        var e = prop.shift();
        assignProperty(obj[e] =
                 Object.prototype.toString.call(obj[e]) === "[object Object]"
                 ? obj[e]
                 : {},
               prop,
               value);
    } else
        obj[prop[0]] = value;
}

//Get command line argument typed value
function getArgValue(value) {
    var testValue;
    //test for 'boolean'
    if (value === '') return true;
    else {
      value = value.substr(1);
      //test for 'null'
      if (value === '') return null;
     
      //test for 'number'
      (testValue = value.match(/'^\d+$/)) && (testValue = parseInt(testValue[0]));
      if (testValue) return testValue;
     
      //test for 'string'
      (testValue = value.match(/^\"?(.*)\"?$/)) && (testValue = testValue[1]);
      if (testValue) return testValue;

      throw new TypeError ('Bad argument value');
    }
}

//Parse command line options
//map argument "name=value"" to object property {name : value}
function MapArgToConfig(args,config){
    var options  =
    args
    .filter(
        //filter config argument setters only
        function(option,index){
            return (option.trim().indexOf('--config.') === 0)
        }
    )
    .forEach(
        function(arg) {
            var propName,value, pair
            pair = arg.match(/(.+?)(=.*|$)/);
            propName = pair[1].substr(arg.indexOf('.')+1);
            value = getArgValue(pair[2]);
            
            assignProperty(config,propName, value);
        }
    );
}

MapArgToConfig(ARGV,config);

config.plugins = config.plugins || [];

/*
Client runtime and compile time environment variables.
Can be used as compilation directives.
It allows to write debugging code that can be avoided at runtime time in production environment
For example:
if (__DEV__) {
  debugger;
} 
*/

var globals = {
  'process.env.NODE_ENV': JSON.stringify(ENV), 
  __CLIENT__: true,
  __SERVER__: false,
  __DEV__: DEBUG,
  __API_URL__: JSON.stringify(config.api.client.url)
};

//Publish globals into client environment
config.plugins.push(new webpack.DefinePlugin(globals));

console.log(config.context);

module.exports = config;
