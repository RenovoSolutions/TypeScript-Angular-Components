// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='breakpoints/breakpoints.module.ts' />
/// <reference path='windowWrapper/windowWrapper.service.ts' />

module rl.ui.services {
	export var moduleName: string = 'rl.ui.services';
	
	angular.module(moduleName, [
		breakpoints.moduleName,
		windowWrapper.moduleName,
	]);
}
