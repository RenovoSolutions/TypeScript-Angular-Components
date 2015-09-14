// uses angularjs

/// <reference path='components/components.module.ts' />
/// <reference path='services/services.module.ts' />

module rl.ui {
	export var moduleName: string = 'rl.ui';

	angular.module(name, [
		components.moduleName,
		services.moduleName,
	]);
}
