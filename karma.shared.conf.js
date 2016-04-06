// Karma default configuration

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');
var webpackJsonLoader = require('./webpack.json-loader');

module.exports = function (karma, karmaSettings) {
	var karmaConfig = karmaSettings(karma, [
		'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.0.0-alpha1/jquery.min.js',
		'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.0/angular.min.js',
		'test-bootstrapper.js',
	]);
	webpackRawLoader(karmaConfig.webpack);
	webpackCssLoader(karmaConfig.webpack);
	webpackJsonLoader(karmaConfig.webpack);
	karmaConfig.webpack.externals = {
		'jquery': '$',
		'angular': 'angular',
	};

	karma.set(karmaConfig);
	return karmaConfig;
};
