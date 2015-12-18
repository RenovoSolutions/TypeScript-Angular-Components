// Karma default configuration

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');

module.exports = function (karma, karmaSettings) {
	var karmaConfig = karmaSettings(karma, [
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.7/angular.min.js',
		'test-bootstrapper.js',
	]);
	webpackRawLoader(karmaConfig.webpack);
	webpackCssLoader(karmaConfig.webpack);
	karmaConfig.webpack.externals = {
		'jquery': '$',
		'angular': 'angular',
	};

	karma.set(karmaConfig);
	return karmaConfig;
};
