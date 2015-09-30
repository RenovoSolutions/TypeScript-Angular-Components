var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');

var webpackConfig = webpack.library(library);
webpackRawLoader(webpackConfig);
webpackCssLoader(webpackConfig);

module.exports = webpackConfig;
