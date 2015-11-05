'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __promiseUtility = services.promise;

export var moduleName: string = 'rl.ui.components.button';

export var directiveName: string = 'rlButtonAsync';
export var controllerName: string = 'ButtonAsyncController';

export interface IButtonScope extends angular.IScope {
	busy: boolean;
	action(...params: any[]): angular.IPromise<any>;
	action(...params: any[]): void;
	size: string;
	type: string;
	ngDisabled: boolean;
	rightAligned: boolean;
}

export interface IButtonAsyncController {
	busy: boolean;
	trigger(): void;
}

class ButtonAsyncController {
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

			var result: angular.IPromise<any> = this.$scope.action();
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

function buttonAsync(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		transclude: true,
		template: require('./buttonAsync.html'),
		scope: {
			busy: '=',
			action: '&',
			type: '@',
			ngDisabled: '=',
			rightAligned: '=',
			size: '@',
		},
		controller: controllerName,
		controllerAs: 'button',
	};
}

angular.module(moduleName, [__promiseUtility.moduleName])
	.directive(directiveName, buttonAsync)
	.controller(controllerName, ButtonAsyncController);
