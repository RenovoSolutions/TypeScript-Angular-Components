// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path="../../../libraries/typescript-angular-utilities/typings/utility.d.ts" />

/// <reference path='simpleCardList.ts' />
/// <reference path='simpleCard.ts' />

module rl.ui.components.simpleCardList {
	'use strict';

	export var moduleName: string = 'rl21.components.simpleCardList';

	import __observable = rl.utilities.services.observable;
	import __parentChild = rl.utilities.services.parentChildBehavior;

	angular.module(moduleName, [__observable.moduleName, __parentChild.moduleName])
		.directive(directiveName, simpleCardList)
		.controller(controllerName, SimpleCardListController)
		.directive(simpleCard.directiveName, simpleCard.simpleCard)
		.controller(simpleCard.controllerName, simpleCard.SimpleCardController);
}
