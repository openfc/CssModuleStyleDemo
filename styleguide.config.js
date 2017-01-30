const path = require('path');
const webpack = require('./webpack.config');
const dir = path.join(__dirname, 'src');
const antDir = path.join(__dirname, 'node_modules/antd');

module.exports = {
    title: 'Лайт',
    sections: [
        {
            name: 'Components',
            components: './src/components/**/[A-Z]*.jsx',
        }
    ],
    updateWebpackConfig: function (webpackConfig) {
        webpack.module.loaders.forEach(function (loader) {
            loader.include = [dir, antDir];
            webpackConfig.module.loaders.push(loader);
        });
        return webpackConfig;
    }
};
