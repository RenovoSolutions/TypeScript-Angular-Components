// Karma default configuration

var webpackRawLoader = require('./webpack.raw-loader');
var webpackCssLoader = require('./webpack.css-loader');
var webpackJsonLoader = require('./webpack.json-loader');

module.exports = function (karma, karmaSettings) {
	var karmaConfig = karmaSettings(karma, 'test-bootstrapper.js', [
		'./node_modules/jquery/dist/jquery.js',
		'./node_modules/angular/angular.js',
		'./node_modules/moment/moment.js',
		'./node_modules/moment-timezone/builds/moment-timezone-with-data.js',
	], {
		'jquery': '$',
		'angular': 'angular',
		'moment': 'moment',
		'moment-timezone': 'moment',
	});

	webpackRawLoader(karmaConfig.webpack);
	webpackCssLoader(karmaConfig.webpack);
	webpackJsonLoader(karmaConfig.webpack);

	karma.set(karmaConfig);
	return karmaConfig;
};
