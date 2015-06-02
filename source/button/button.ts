'use strict';

export var directiveName: string = 'rlButton';
export var controllerName: string = 'ButtonController';

import __promiseUtility = require('../../services/promiseUtility/promiseUtility.service');

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
	static $inject: string[] = ['$scope', __promiseUtility.name];
	constructor(private $scope: IButtonScope, private promiseUtility: __promiseUtility.IPromiseUtility) {
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

export function button(): angular.IDirective {
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
