var moduleName = require('source/ui.module').moduleName;
var UpgradeModule = require('@angular/upgrade/static').UpgradeModule;
var core = require('@angular/core');
var testingBrowser = require('@angular/platform-browser-dynamic/testing');
var browser = require('@angular/platform-browser');
var forms = require('@angular/forms');
var utilities = require('typescript-angular-utilities');
var ComponentsModule = require('./source/ui.module').ComponentsModule;

class TestModule { ngDoBootstrap() { } }
core.NgModule({
	imports: [
		browser.BrowserModule,
		forms.ReactiveFormsModule,
		utilities.UtilitiesModule,
		ComponentsModule,
		UpgradeModule,
	],
})(TestModule)

function setup() {
	beforeEach(function () {
		angular.mock.module(moduleName);
	});

	return new Promise(function (resolve) {
		var ng2Injector = null;

		angular.module(moduleName)
			.factory('$$angularInjector', function () {
				return {
					get: function (token) {
						return ng2Injector.get(token);
					},
				};
			});
		testingBrowser.platformBrowserDynamicTesting().bootstrapModule(TestModule).then(function(platformRef) {
			ng2Injector = platformRef.injector;
			resolve();
		});
	});
}

module.exports = setup;
