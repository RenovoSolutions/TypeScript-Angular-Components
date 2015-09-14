// uses typings/angularj
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path="../../../typings/lodash/lodash.d.ts" />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

module rl.ui.components.button {
	'use strict';

	import __promiseUtility = rl.utilities.services.promise;
	
	export var moduleName: string = 'rl.ui.components.button';
	
	export var directiveName: string = 'rlButton';
	export var controllerName: string = 'ButtonController';
	
	export interface IButtonScope extends ng.IScope {
		busy: boolean;
		action(...params: any[]): ng.IPromise<any>;
		action(...params: any[]): void;
		size: string;
	}
	
	export interface IButtonController {
		busy: boolean;
		trigger(): void;
	}
	
	class ButtonController {
		static $inject: string[] = ['$scope', __promiseUtility.serviceName];
		constructor(private $scope: IButtonScope, private promiseUtility: __promiseUtility.IPromiseUtility) {
			this.busy = $scope.busy;
			this.sizeClass = $scope.size != null ? 'btn-' + $scope.size : null;
	
			if (!_.isUndefined($scope.busy)) {
				$scope.$watch('busy', (value: boolean): void => {
					if (value !== this.busy) {
						this.busy = value;
					}
				});
	
				$scope.$watch((): boolean => { return this.busy; }, (value: boolean): void => {
					if (value !== $scope.busy) {
						$scope.busy = value;
					}
				});
			}
		}
	
		trigger(): void {
			if (!this.busy) {
				this.busy = true;
	
				var result: ng.IPromise<any> = this.$scope.action();
				if (this.promiseUtility.isPromise(result) && _.isFunction(result.finally)) {
					result.finally((): void => {
						this.busy = false;
					});
				}
			}
		}
	
		busy: boolean;
		sizeClass: string;
	}
	
	function button(): angular.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'components/button/button.html',
			scope: {
				busy: '=',
				action: '&',
				type: '@',
				ngDisabled: '=',
				buttonRightAligned: '=',
				size: '@',
			},
			controller: controllerName,
			controllerAs: 'button',
		};
	}
	
	angular.module(moduleName, [__promiseUtility.moduleName])
		.directive(directiveName, button)
		.controller(controllerName, ButtonController);
}
