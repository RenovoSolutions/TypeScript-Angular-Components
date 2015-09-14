/*// uses angularjs
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' /> 

module rl.ui.components.autosaveComponent {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.autosaveComponent';
	
	export var directiveName: string = 'rlAutosaveComponent';
	export var controllerName: string = 'AutosaveComponentController';
	
	import __parentChildBehavior = rl.utilities.services.parentChildBehavior;
	import __objectUtility = rl.utilities.services.object;
	import __autosaveAction = rl.utilities.services.autosaveAction;
	import __autosaveBehavior = require('../../behaviors/autosave/autosave');
	
	export interface IAutosaveComponentController {
		autosave(): boolean;
	}
	
	export interface IAutosaveComponentAttributes extends ng.IAttributes {
		validate: string;
	}
	
	export interface IAutosaveComponentScope extends ng.IScope {
		childLink: __parentChildBehavior.IChild<any>;
		validate(): boolean;
		save(): ng.IPromise<void>;
	
		// private properties shared between the controller and scope
		contentForm: ng.IFormController;
	}
	
	class AutosaveComponentController {
		static $inject: string[] = ['$scope', '$attrs', __parentChildBehavior.serviceName, __objectUtility.serviceName, __autosaveAction.serviceName];
		constructor(private $scope: IAutosaveComponentScope
			, $attrs: IAutosaveComponentAttributes
			, parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService
			, objectUtility: __objectUtility.IObjectUtility
			, private autosaveService: __autosaveAction.IAutosaveActionService) {
			this.hasValidator = objectUtility.isNullOrWhitespace($attrs.validate) === false;
	
			var behavior: __autosaveBehavior.IAutosaveBehavior = {
				autosave: this.autosave,
			};
	
			parentChildBehavior.registerChildBehavior(this.$scope.childLink, behavior);
		}
	
		private hasValidator: boolean;
	
		autosave: { (): boolean } = (): boolean => {
			if (this.$scope.contentForm.$pristine) {
				return true;
			}
	
			var valid: boolean = true;
			if (this.hasValidator) {
				valid = this.$scope.validate();
				if (valid === undefined) {
					valid = true;
				}
			}
	
			if (valid) {
				this.autosaveService.trigger(this.$scope.save().then((): void => {
					if (this.$scope.contentForm != null) {
						this.$scope.contentForm.$setPristine();
					}
				}));
				return true;
			} else {
				return false;
			}
		}
	}
	
	function autosaveComponent(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'components/autosaveComponent/autosaveComponent.html',
			controller: controllerName,
			controllerAs: 'autosave',
			scope: {
				childLink: '=',
				validate: '&',
				save: '&',
			},
		};
	}
	
	angular.module(moduleName, [__parentChildBehavior.moduleName, __objectUtility.moduleName, __autosaveAction.moduleName])
		.directive(directiveName, autosaveComponent)
		.controller(controllerName, AutosaveComponentController);
}
*/