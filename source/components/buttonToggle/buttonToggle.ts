// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' /> 

module rl.ui.components.buttonToggle {
	'use strict';
	
	import __boolean = rl.utilities.services.boolean;
	
	export var moduleName: string = 'rl.ui.components.buttonToggle';
	
	export var directiveName: string = 'rlButtonToggle';
	export var controllerName: string = 'ButtonToggleController';
	
	export interface IButtonToggleScope extends ng.IScope {
		ngModel: ng.INgModelController;
		type: string;
		size: string;
		onToggle(param: IToggleParam): void;
		disabled: boolean;
	}
	
	export interface IToggleParam {
		value: boolean;
	}
	
	export interface IButtonToggleController {
		isActive: boolean;
		buttonClass: string;
		buttonSize: string;
		
		clicked(): void;
	}
	
	class ButtonToggleController {
		isActive: boolean;
		buttonClass: string;
		buttonSize: string;
	
		static $inject: string[] = ['$scope', __boolean.serviceName];
		constructor(private $scope: IButtonToggleScope, bool: __boolean.IBooleanUtility) {
			this.buttonClass = $scope.type != null ? $scope.type : 'default';
			this.buttonSize = $scope.size != null ? 'btn-' + $scope.size : null;
	
			$scope.$watch('ngModel.$modelValue', (value: boolean): void => {
				this.isActive = bool.toBool(value);
	
				if (value != null && _.isFunction($scope.onToggle)) {
					$scope.onToggle({ value: value });
				}
			});
		}
	
		clicked(): void {
			this.$scope.ngModel.$setViewValue(!this.$scope.ngModel.$viewValue);
		}
	}
	
	function buttonToggle(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^ngModel',
			transclude: true,
			templateUrl: 'components/buttonToggle/buttonToggle.html',
			controller: controllerName,
			controllerAs: 'buttonToggle',
			scope: {
				type: '@',
				size: '@',
				onToggle: '&',
				disabled: '=ngDisabled',
			},
			link(scope: IButtonToggleScope
				, element: ng.IAugmentedJQuery
				, attrs: ng.IAttributes
				, ngModel: ng.INgModelController): void {
				scope.ngModel = ngModel;
			}
		};
	}

	angular.module(moduleName, [__boolean.moduleName])
		.directive(directiveName, buttonToggle)
		.controller(controllerName, ButtonToggleController);
}
