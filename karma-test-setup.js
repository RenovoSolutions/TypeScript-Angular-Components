var moduleName = require('source/ui.module').moduleName;
var UpgradeAdapter = require('@angular/upgrade').UpgradeAdapter;
var downgrade = require('typescript-angular-utilities').downgrade;

var upgrade = new UpgradeAdapter();

function setup() {
	beforeEach(function () {
		angular.mock.module(moduleName);
	});

	return new Promise(function (resolve) {
		downgrade.downgradeUtilitiesToAngular1(upgrade);

		let ng2Injector = null;

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
