var moduleName = require('source/ui.module').moduleName;
var UpgradeAdapter = require('@angular/upgrade').UpgradeAdapter;
var core = require('@angular/core');
var browser = require('@angular/platform-browser');
var forms = require('@angular/forms');
var downgrade = require('typescript-angular-utilities').downgrade;
var downgradeComponents = require('./source/componentsDowngrade');
var ComponentsModule = require('./source/ui.module').ComponentsModule;

var upgrade = new UpgradeAdapter(core.forwardRef(function () { return TestModule; }));

class TestModule { }
core.NgModule({
	imports: [
		browser.BrowserModule,
		forms.ReactiveFormsModule,
		ComponentsModule,
	],
})(TestModule)

function setup() {
	beforeEach(function () {
		angular.mock.module(moduleName);
	});

	return new Promise(function (resolve) {
		downgrade.downgradeUtilitiesToAngular1(upgrade);
		downgradeComponents.downgradeComponentsToAngular1(upgrade);

		var ng2Injector = null;

		angular.module(moduleName)
			.factory('ng2.Injector', function () {
				return ng2Injector;
			});

		upgrade.bootstrap(document.body, [moduleName])
			.ready(function (ref) {
				ng2Injector = ref.ng2Injector;
				resolve();
			});
	});
}

module.exports = setup;
