require('core-js/es6');
require('core-js/es7/reflect');

var angular = require('angular');
var UpgradeAdapter = require('angular2/upgrade').UpgradeAdapter;
var adapter = new UpgradeAdapter();

var utilities = require('typescript-angular-utilities');
var downgrade = utilities.downgrade;

var testModuleName = 'test-bootstrapper';

downgrade.downgradeUtilitiesToAngular1(adapter);

angular.mock.module(downgrade.moduleName);

// require all modules ending in ".tests.ts" from source and all subdirectories
var testsContext = require.context('./source', true, /\.tests\.js$/);
testsContext.keys().forEach(testsContext);
