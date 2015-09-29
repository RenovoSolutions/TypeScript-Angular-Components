var webpack = require('gulp-utilities').webpack;
var library = require('./webpack.library.json');

var webpackRawLoader = require('./webpack.raw-loader');

var webpackConfig = webpack.libraryMin(library);
webpackRawLoader(webpackConfig);

module.exports = webpackConfig;
