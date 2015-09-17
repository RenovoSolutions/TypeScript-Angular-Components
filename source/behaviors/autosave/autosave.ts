// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

module rl.ui.behaviors.autosave {
	'use strict';
	
	export var moduleName: string = 'rl.ui.behaviors.autosave';
	export var directiveName: string = 'rlAutosave';
	export var controllerName: string = 'AutosaveController';
	
	import __autosave = rl.utilities.services.autosave;
	import __parentChild = rl.utilities.services.parentChildBehavior;
	import __objectUtility = rl.utilities.services.object;
	import __autosaveAction = rl.utilities.services.autosaveAction;
	
	export interface IAutosaveAttributes extends ng.IAttributes {
		rlAutosave: string;
		validate: string;
		save: string;
	}
	
	export interface IAutosaveBehavior {
		autosave(): boolean;
	}
	
	export class AutosaveController {
		static $inject: string[] = ['$scope'
								, '$attrs'
								, '$parse'
								, '$element'
								, __autosave.factoryName
								, __parentChild.serviceName
								, __objectUtility.serviceName
								, __autosaveAction.serviceName];
		constructor(private $scope: ng.IScope
			, $attrs: IAutosaveAttributes
			, $parse: ng.IParseService
			, $element: ng.IAugmentedJQuery
			, autosaveFactory: __autosave.IAutosaveServiceFactory
			, parentChildBehavior: __parentChild.IParentChildBehaviorService
			, objectUtility: __objectUtility.IObjectUtility) {
			var contentForm: ng.IFormController = $element.controller('form');
	
			var hasValidator: boolean = objectUtility.isNullOrWhitespace($attrs.validate) === false;
	
			var validateExpression: ng.ICompiledExpression = $parse($attrs.validate);
			var validate: { (): boolean };
	
			if (hasValidator) {
				validate = (): boolean => {
					return validateExpression($scope);
				};
			}
	
			var saveExpression: ng.ICompiledExpression = $parse($attrs.save);
			var save: { (): ng.IPromise<void> } = (): ng.IPromise<void> => {
				return saveExpression($scope);
			};
	
			var autosave: __autosave.IAutosaveService = autosaveFactory.getInstance(save, contentForm, validate);
	
			var behavior: IAutosaveBehavior = {
				autosave: autosave.autosave,
			};
	
			// register autosave behavior and assign the value back to the parent
			var childLink: any = $parse($attrs.rlAutosave)($scope);
			parentChildBehavior.registerChildBehavior(childLink, behavior);
		}
	}
	
	export function autosave(): ng.IDirective {
		'use strict';
		return {
			restrict: 'A',
			require: '?ngForm',
			controller: controllerName,
		};
	}
	
	angular.module(moduleName, [
		__autosave.moduleName,
		__autosaveAction.moduleName,
		__objectUtility.moduleName,
		__parentChild.moduleName,	
	])
		.directive(directiveName, autosave)
		.controller(controllerName, AutosaveController);
}