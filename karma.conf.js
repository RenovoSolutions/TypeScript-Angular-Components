module.exports = function (config) {
	config.set({
		frameworks: ['mocha', 'chai', 'sinon'],
		plugins: [
			require('karma-mocha'),
			require('karma-chai'),
			require('karma-sinon'),
			require('karma-chrome-launcher'),
			require('karma-firefox-launcher'),
			require('karma-ie-launcher'),
		],

		files: [
			{ pattern: 'node_modules/es6-shim/es6-shim.js', included: true, watched: false },
			{ pattern: 'node_modules/zone.js/dist/zone.js', included: true, watched: false },
			{ pattern: 'node_modules/reflect-metadata/Reflect.js', included: true, watched: false },
			{ pattern: 'node_modules/systemjs/dist/system-polyfills.js', included: true, watched: false },
			{ pattern: 'node_modules/systemjs/dist/system.src.js', included: true, watched: false },
			{ pattern: 'node_modules/zone.js/dist/async-test.js', included: true, watched: false },

			{ pattern: 'tests/tests.bundle.js', included: true, watched: true },

			{ pattern: 'karma-test-shim.js', included: true, watched: true },

			// Make files available
			{ pattern: 'system.config.js', included: false, watched: true },
		],

		exclude: [
			// Vendor packages might include spec files. We don't want to use those.
			'node_modules/**/*.spec.js'
		],

		reporters: ['progress'],

		port: 2000,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true,
	});
};


// // Karma default configuration

// var karmaSettings = require('gulp-utilities').karma.standard;
// var config = require('./karma.shared.conf');

// module.exports = function (karma) {
// 	config(karma, karmaSettings);
// };
