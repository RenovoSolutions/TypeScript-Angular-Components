/*global jasmine, __karma__, window*/

Error.stackTraceLimit = Infinity;
mocha.setup({
	timeout: 2000,
})

__karma__.loaded = function () {
};

var basePath = '/base';
var appPath = basePath + '/source/';

function isJsFile(path) {
	return endsWith(path, '.js');
}

function isSpecFile(path) {
	return endsWith(path, '.tests.js');
}

function endsWith(path, ending) {
	return path.slice(-ending.length) == ending;
}

function isAppFile(path) {
	return isJsFile(path) && (path.substr(0, appPath.length) == appPath);
}

function removeBase(path) {
	return path.slice(basePath.length);
}

var allSpecFiles = Object.keys(window.__karma__.files)
	.filter(isSpecFile)
	.filter(isAppFile)
	.map(function (specPath) { return removeBase(specPath) });

// Load our SystemJS configuration.
System.config({
	paths: {
		'system.config.js': 'base/system.config.js',
	},
});

System.import('system.config.js')
	.then(function () {
		return System.import('karma-test-setup.js')
			.then(function (setup) {
				return setup();
			});
	})
	// .then(function () {
	// 	// Load and configure the TestComponentBuilder.
	// 	return Promise.all([
	// 		System.import('@angular/core/testing'),
	// 		System.import('@angular/platform-browser-dynamic/testing')
	// 	]).then(function (providers) {
	// 		var testing = providers[0];
	// 		var testingBrowser = providers[1];

	// 		testing.setBaseTestProviders(testingBrowser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
	// 			testingBrowser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS);
	// 	});
	// })
	.then(function () {
		// Finally, load all spec files.
		// This will run the tests directly.
		return Promise.all(
			allSpecFiles.map(function (moduleName) {
				return System.import(moduleName);
			}));
	})
	.then(__karma__.start, __karma__.error);

// require('core-js/es6');
// require('core-js/es7/reflect');

// var angular = require('angular');
// var UpgradeAdapter = require('angular2/upgrade').UpgradeAdapter;
// var adapter = new UpgradeAdapter();

// var utilities = require('typescript-angular-utilities');
// var downgrade = utilities.downgrade;

// var testModuleName = 'test-bootstrapper';

// downgrade.downgradeUtilitiesToAngular1(adapter);

// angular.mock.module(downgrade.moduleName);

// // require all modules ending in ".tests.ts" from source and all subdirectories
// var testsContext = require.context('./source', true, /\.tests\.js$/);
// testsContext.keys().forEach(testsContext);
