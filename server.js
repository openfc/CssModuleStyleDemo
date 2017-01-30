var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

const host = '0.0.0.0';
const port = 3000;
const ssl = config.ssl || false;

const url =  `http${ssl ? 's' : ''}://localhost:${port}`

const webpackDevServerEntries = [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${url}`,
    'webpack/hot/only-dev-server'
    ]

//Path entry point value to enable webpack-dev-server HMR
function patchEntryPoint(entry) {
   if (typeof entry === 'string') entry = [entry]
   else 
   if (!Array.isArray()) 
      throw new TypeError("Unsupported webpack entry value type " + Object.prototype.toString.call(entry) + " , expected [String, Array]");

    Array.prototype.unshift.apply(entry,webpackDevServerEntries);

    return entry;
};

//Patch webpack config to enable HMR
switch (Object.prototype.toString.call(config.entry)) {
    //test for Hash Object
    case '[object Object]':
        Object.keys(config.entry)
            .forEach(
                function(key){
                    this[key] = patchEntryPoint(this[key])
                },
                config.entry
            )
        break
    default:
        config.entry = patchEntryPoint(config.entry)
        break
}

//Setup proxy
var proxy = {}
if (config.api) {
    proxy = 
    Object.keys(config.api)
        .reduce(function(value,item){
            if (config.api[item].proxy)
                value[config.api[item].url] = {
                    target: config.api[item].proxy,
                    changeOrigin: true,
                    secure: false,
                    proxyTimeout: 60 * 1000                    
                }
            return value;
        },proxy)
}
        
new WebpackDevServer(webpack(config), {
    stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        hash: false,
        modules: false,
        version: false,
    },
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'info',
    noInfo: false,
    https: ssl,
    quiet: false,
    proxy: proxy
}).listen(port, function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log(`Listening at ${url}`);
});
