// /// <reference path='../../../typings/bootstrap-touchspin/bootstrap-touchspin.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />

'use strict';

import '../../../libraries/bootstrap-touchspin/index';


import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __string = services.string;
import __number = services.number;

export var moduleName: string = 'rl.ui.components.spinner';
export var directiveName: string = 'rlSpinner';
export var controllerName: string = 'SpinnerController';

export interface ISpinnerScope extends angular.IScope {
	min: number;
	max: number;
	step: number;
	decimals: number;
	prefix: string;
	postfix: string;
	roundToStep: boolean;
	ngDisabled: boolean;
	ngModel: number;
	spinnerId: string;
	name: string;
}

spinner.$inject = ['$timeout', __string.serviceName, __number.serviceName];
function spinner($timeout: angular.ITimeoutService
				, stringUtility: __string.IStringUtilityService
				, numberUtility: __number.INumberUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<rl-generic-container selector="ngDisabled">
				<template default>
					<input name="{{name}}" class="spinner" ng-hide="ngDisabled" id="{{spinnerId}}" type="text" />
				</template>
				<template when-selector="true">
					<div class="input-group" ng-show="prefix != null && postfix != null">
						<span class="input-group-addon">{{prefix}}</span>
						<input ng-disabled="ngDisabled" type="text" ng-model="ngModel" class="form-control" />
						<span class="input-group-addon">{{postfix}}</span>
					</div>
					<div class="input-group" ng-show="prefix != null && postfix == null">
						<span class="input-group-addon">{{prefix}}</span>
						<input ng-disabled="ngDisabled" type="text" ng-model="ngModel" class="form-control" />
					</div>
					<div class="input-group" ng-show="prefix == null && postfix != null">
						<input ng-disabled="ngDisabled" type="text" ng-model="ngModel" class="form-control" />
						<span class="input-group-addon">{{postfix}}</span>
					</div>
					<div ng-show="prefix == null && postfix == null">
						<input ng-disabled="ngDisabled" type="text" ng-model="ngModel" class="form-control" />
					</div>
				</template>
			</rl-generic-container>
		`,
		require: '?^ngModel',
		scope: {
			min: '=',
			max: '=',
			step: '=',
			decimals: '=',
			prefix: '@',
			postfix: '@',
			roundToStep: '=',
			ngDisabled: '=',
			ngModel: '=',
			spinnerId: '@',
			name: '@',
		},
		link(scope: ISpinnerScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, ngModel: angular.INgModelController): void {

			var unbindWatches: Function;
			scope.$watch('ngDisabled', (disabled: boolean): void => {
				if (disabled) {
					if (_.isFunction(unbindWatches)) {
						unbindWatches();
					}
				} else {
					// Initialize the spinner after $timeout to give angular a chance initialize ngModel
					$timeout((): void => {
						let touchspin: JQuery = element.find('input.spinner').TouchSpin({
							min: (scope.min || Number.MIN_VALUE),
							max: (scope.max || Number.MAX_VALUE),
							step: scope.step,
							prefix: scope.prefix,
							postfix: scope.postfix,
							decimals: scope.decimals,
							initval: ngModel.$viewValue,
							forcestepdivisibility: scope.roundToStep ? 'round' : 'none',
						});

						touchspin.on('change', (): void => {
							scope.$apply((): void => {
								let spinValue: string = touchspin.val();
								ngModel.$setViewValue(stringUtility.toNumber(spinValue));
							});
						});

						let unbindViewWatch = scope.$watch((): void => {
							return ngModel.$viewValue;
						}, (newValue: any): void => {
							touchspin.val(newValue != null ? newValue.toString() : '');
						});

						let unbindModelWatch = scope.$watch((): void => {
							return ngModel.$modelValue;
						}, (newModel: any): void => {
							scope.ngModel = round(newModel);
						});

						unbindWatches = (): void => {
							unbindViewWatch();
							unbindModelWatch();
						}
					});
				}
			});

			function round(num: number): number {
				if (num != null && scope.roundToStep) {
					num = numberUtility.roundToStep(num, scope.step);
					num = numberUtility.preciseRound(num, scope.decimals);
				}

				return num;
			}
		}
	};
}

angular.module(moduleName, [__string.moduleName])
	.directive(directiveName, spinner);
