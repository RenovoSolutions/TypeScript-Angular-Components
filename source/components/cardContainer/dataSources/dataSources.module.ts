// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

/// <reference path='dataPager/dataPager.service.ts' />

module rl.ui.components.cardContainer.dataSources {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.dataSources';
	
	angular.module(moduleName, [
		dataPager.moduleName,
	]);
}
