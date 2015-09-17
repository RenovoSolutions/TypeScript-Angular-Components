// uses angularjs

/// <reference path='behaviors/behaviors.module.ts' />
/// <reference path='components/components.module.ts' />
/// <reference path='services/services.module.ts' />

module rl.ui {
	export var moduleName: string = 'rl.ui';

	angular.module(name, [
		behaviors.moduleName,
		components.moduleName,
		services.moduleName,
	]);
}
