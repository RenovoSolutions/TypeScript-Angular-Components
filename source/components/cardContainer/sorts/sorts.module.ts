// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

/// <reference path='mergeSort/mergeSort.service.ts' />

module rl.ui.components.cardContainer.sorts {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.sorts';
	
	angular.module(moduleName, [
		mergeSort.moduleName
	]);
}
