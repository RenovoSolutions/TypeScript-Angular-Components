var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');
var webpackJsonLoader = require('./webpack.json-loader');

var webpackConfig = webpack.libraryMin(library);
webpackRawLoader(webpackConfig);
webpackCssLoader(webpackConfig);
webpackJsonLoader(webpackConfig);

module.exports = webpackConfig;
