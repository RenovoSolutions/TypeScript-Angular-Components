var angular = require('angular');
var UpgradeAdapter = require('angular2/upgrade');
var adapter = new UpgradeAdapter();

var downgrade = require('typescript-angular-utilities').downgrade;

var testModuleName = 'test-bootstrapper';

angular.module(testModuleName, [])
	.config(function () {
		downgrade.downgradeUtilitiesToAngular1(adapter);
	});

angular.mock.module(testModuleName);

// require all modules ending in ".tests.ts" from source and all subdirectories
var testsContext = require.context('./source', true, /\.tests\.js$/);
testsContext.keys().forEach(testsContext);
