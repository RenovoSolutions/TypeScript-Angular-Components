// Karma default configuration

var karmaSettings = require('gulp-utilities').karma.standard;
var webpackRawLoader = require('./webpack.raw-loader');

module.exports = function (karma) {
	var karmaConfig = karmaSettings(karma, ['test-bootstrapper.js']);
	webpackRawLoader(karmaConfig.webpack);

	karma.set(karmaConfig);
};
