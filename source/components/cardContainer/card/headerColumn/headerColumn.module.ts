// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='headerColumn.ts' />
/// <reference path='sizeForBreakpoints.ts' />

module rl.ui.components.cardContainer.card.headerColumn {
	export var moduleName: string = 'rl.ui.components.cardContainer.card.headerColumn';
	
	angular.module(moduleName, [
		utilities.services.string.moduleName,
	])
		.directive(sizeForBreakpointsName, sizeForBreakpoints)
		.directive(directiveName, headerColumn)
		.controller(controllerName, HeaderColumnController);
}
