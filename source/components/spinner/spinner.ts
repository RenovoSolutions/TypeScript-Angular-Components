// /// <reference path='../../../typings/bootstrap-touchspin/bootstrap-touchspin.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import '../../../libraries/bootstrap-touchspin/index';


import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __validation = services.validation;
import __string = services.string;
import __number = services.number;

import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export let moduleName: string = 'rl.ui.components.spinner';
export let directiveName: string = 'rlSpinner';
export let controllerName: string = 'SpinnerController';

export let defaultMaxValue: number = 100000000000000000000;

export interface ISpinnerBindings {
	min: number;
	max: number;
	step: number;
	decimals: number;
	prefix: string;
	postfix: string;
	roundToStep: boolean;
	ngDisabled: boolean;
	spinnerId: string;
	name: string;
	validator: __validation.IValidationHandler;
}

interface ISpinnerScope extends angular.IScope {
	spinner: SpinnerController;
}

export class SpinnerController {
	min: number;
	max: number;
	step: number;
	decimals: number;
	prefix: string;
	postfix: string;
	roundToStep: boolean;
	ngDisabled: boolean;
	spinnerId: string;
	name: string;
	validator: __validation.IValidationHandler;

	ngModel: angular.INgModelController;
	spinnerValidator: IComponentValidator;

	static $inject: string[] = ['$scope', componentValidatorFactoryName];
	constructor($scope: angular.IScope
			, componentValidatorFactory: IComponentValidatorFactory) {
		let unregister: Function = $scope.$watch((): any => { return this.ngModel; }, (value: angular.INgModelController): void => {
			if (!_.isUndefined(this.validator)) {
				this.spinnerValidator = componentValidatorFactory.getInstance({
					ngModel: this.ngModel,
					$scope: $scope,
					validators: [this.validator],
				});
			}
			unregister();
		});
	}
}

spinner.$inject = ['$timeout', __string.serviceName, __number.serviceName];
function spinner($timeout: angular.ITimeoutService
				, stringUtility: __string.IStringUtilityService
				, numberUtility: __number.INumberUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./spinner.html'),
		require: '?^ngModel',
		controller: controllerName,
		controllerAs: 'spinner',
		scope: {},
		bindToController: {
			min: '=',
			max: '=',
			step: '=',
			decimals: '=',
			prefix: '@',
			postfix: '@',
			roundToStep: '=',
			ngDisabled: '=',
			spinnerId: '@',
			name: '@',
			validator: '=',
		},
		link(scope: ISpinnerScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, ngModel: angular.INgModelController): void {

			let spinner: SpinnerController = scope.spinner;
			spinner.ngModel = ngModel;
			let unbindWatches: Function;
			scope.$watch('ngDisabled', (disabled: boolean): void => {
				if (disabled) {
					if (_.isFunction(unbindWatches)) {
						unbindWatches();
					}
				} else {
					// Initialize the spinner after $timeout to give angular a chance initialize ngModel
					$timeout((): void => {
						let touchspin: JQuery = element.find('input.spinner').TouchSpin({
							min: (spinner.min != null ? spinner.min : 0),
							max: (spinner.max != null ? spinner.max : defaultMaxValue),
							step: spinner.step,
							prefix: spinner.prefix,
							postfix: spinner.postfix,
							decimals: spinner.decimals,
							initval: ngModel.$viewValue,
							forcestepdivisibility: spinner.roundToStep ? 'round' : 'none',
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
							ngModel.$modelValue = round(newModel);
						});

						unbindWatches = (): void => {
							unbindViewWatch();
							unbindModelWatch();
						}
					});
				}
			});

			function round(num: number): number {
				if (num != null && spinner.roundToStep) {
					num = numberUtility.roundToStep(num, spinner.step);
					num = numberUtility.preciseRound(num, spinner.decimals);
				}

				return num;
			}
		}
	};
}

angular.module(moduleName, [__string.moduleName, componentValidatorModuleName])
	.directive(directiveName, spinner)
	.controller(controllerName, SpinnerController);
