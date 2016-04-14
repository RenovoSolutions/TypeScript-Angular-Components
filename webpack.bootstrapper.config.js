var path = require('path');

var webpack = require('webpack');

var webpackUtility = require('gulp-utilities').webpack;

var webpackConfig = {
	entry: './bootstrapper/bootstrapper.js',
	output: {
		path: path.resolve('bootstrapper'),
		filename: 'app.js',
	},
	externals: {
		'jquery': '$',
		'angular': 'angular',
		'moment': 'moment',
		'moment-timezone': 'moment',
		'lodash': '_',
		'typescript-angular-utilities': 'rl_utilities',
	},
	devtool: 'inline-source-map',
	module: {
		loaders: webpackUtility.loaders,
	},
};

module.exports = webpackConfig;