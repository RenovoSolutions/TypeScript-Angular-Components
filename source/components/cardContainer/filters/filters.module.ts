// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

/// <reference path='columnSearchFilter/columnSearchFilter.service.ts' />
/// <reference path='filterGroup/filterGroup.module.ts' />

module rl.ui.components.cardContainer.filters {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.filters';
	
	angular.module(moduleName, [
		columnSearchFilter.moduleName,
		filterGroup.moduleName,
	]);
}
