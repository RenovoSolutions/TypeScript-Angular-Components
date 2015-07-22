// uses utilities.d.ts
// uses typings/angularjs
// uses typings/lodash

module rl.components.button {
	'use strict';
	
	export var moduleName: string = 'rl.components.button';
	
	export var directiveName: string = 'rlButton';
	export var controllerName: string = 'ButtonController';
	
	export interface IButtonScope extends ng.IScope {
		busy: boolean;
		action(...params: any[]): ng.IPromise<any>;
		action(...params: any[]): void;
	}
	
	export interface IButtonController {
		busy: boolean;
		trigger(): void;
	}

	export class ButtonController {
		static $inject: string[] = ['$scope',  utilities.promise.serviceName];
		constructor(private $scope: IButtonScope, private promiseUtility: utilities.promise.IPromiseUtility) {
			this.busy = $scope.busy;
	
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
	}
	
	export function button(): ng.IDirective {
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
			},
			controller: controllerName,
			controllerAs: 'button',
		};
	}
	
	angular.module(moduleName, [utilities.promise.moduleName])
		.directive(directiveName, button)
		.controller(controllerName, ButtonController);
}
