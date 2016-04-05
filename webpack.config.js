var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');
var webpackJsonLoader = require('./webpack.json-loader');

var webpackConfig = webpack.library(library);
webpackRawLoader(webpackConfig);
webpackCssLoader(webpackConfig);
webpackJsonLoader(webpackConfig);

webpackConfig.devtool = "inline-source-map";

module.exports = webpackConfig;
