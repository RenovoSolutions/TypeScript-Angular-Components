// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='dataSources/dataPager/dataPager.service.ts' />
/// <reference path='dataSources/dataSources.module.ts' />
/// <reference path='filters/filters.module.ts' />
/// <reference path='sorts/sorts.module.ts' />
/// <reference path='cardContainer.ts' />

module rl.ui.components.cardContainer {
	export var moduleName: string = 'rl.ui.components.cardContainer';
	
	import __object = rl.utilities.services.object;
	import __array = rl.utilities.services.array;
	import __parentChild = rl.utilities.services.parentChildBehavior;
	
	angular.module(moduleName, [
		dataSources.dataPager.moduleName,
		__object.moduleName,
		__array.moduleName,
		__parentChild.moduleName,
		
		dataSources.moduleName,
		filters.moduleName,
		sorts.moduleName,
	])
		.directive(directiveName, cardContainer)
		.controller(controllerName, CardContainerController);
}
