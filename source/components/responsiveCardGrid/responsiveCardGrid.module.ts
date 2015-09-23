// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path="responsiveCardGrid.ts" />
/// <reference path="responsiveCard.ts" />

module rl.ui.components.responsiveCardGrid {
	'use strict';

	export var moduleName: string = 'rl.ui.components.responsiveCardGrid';

	import __jqueryHelper = rl.utilities.services.jquery;
	import __parentChildBehavior = rl.utilities.services.parentChildBehavior;
	import __observable = rl.utilities.services.observable;
	import __promiseUtility = rl.utilities.services.promise;
	import __numberUtility = rl.utilities.services.number;

	angular.module(moduleName, [
		__jqueryHelper.moduleName,
		__parentChildBehavior.moduleName,
		__observable.moduleName,
		__promiseUtility.moduleName,
		__numberUtility.moduleName,
	])
		.directive(directiveName, responsiveCardGrid)
		.controller(controllerName, ResponsiveCardGridController)
		.directive(responsiveCard.directiveName, responsiveCard.responsiveCard)
		.controller(responsiveCard.controllerName, responsiveCard.ResponsiveCardController);
}