import '../../../../libraries/bootstrap-touchspin/index';


import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __string = services.string;
import __number = services.number;
import __object = services.object;

import { buildInput, InputController, moduleName as inputModule, IInputAttributes } from '../input.ng1';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../../services/componentValidator/componentValidator.service.ng1';

import { INgModelValidator } from '../../../types/formValidators';
import { directiveName as requiredDirectiveName, RequiredController } from '../../../behaviors/required/required';

import { IChangeObject } from '../../../types/changes';

export const moduleName: string = 'rl.ui.components.spinner';
export const componentName: string = 'rlSpinner';
export const controllerName: string = 'SpinnerController';

export const defaultMaxValue: number = 100000000000000000000;

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
}

export interface ISpinnerChanges {
	ngDisabled: IChangeObject<boolean>;
}

interface ISpinnerScope extends angular.IScope {
	spinner: SpinnerController;
}

export class SpinnerController extends InputController {
	min: number;
	max: number;
	step: number;
	decimals: number;
	prefix: string;
	postfix: string;
	roundToStep: boolean;
	ngDisabled: boolean;
	spinnerId: string;

	static $inject: string[] = ['$scope', '$attrs', componentValidatorFactoryName, '$element', '$timeout'];
	constructor($scope: angular.IScope
			, $attrs: IInputAttributes
			, componentValidatorFactory: IComponentValidatorFactory
			, private $element: angular.IAugmentedJQuery
			, private $timeout: angular.ITimeoutService) {
		super($scope, $attrs, componentValidatorFactory);

		this.inputType = 'spinner';
	}

	$postLink(): void {
		this.setDisabled(this.ngDisabled);
	}

	$onChanges(changes: ISpinnerChanges): void {
		if (changes.ngDisabled) {
			this.setDisabled(changes.ngDisabled.currentValue);
		}
	}

	private round(num: number): number {
		if (num != null && this.roundToStep) {
			num = __number.numberUtility.roundToStep(num, this.step);
			num = __number.numberUtility.preciseRound(num, this.decimals);
		}

		return num;
	}

	private unbindWatches: Function;

	private setDisabled(disabled: boolean) {
		if (disabled) {
			if (_.isFunction(this.unbindWatches)) {
				this.unbindWatches();
			}
		} else {
			// Initialize the spinner after $timeout to give angular a chance initialize ngModel
			this.$timeout((): void => {
				const touchspin: JQuery = this.$element.find('input.spinner').TouchSpin({
					min: (this.min != null ? this.min : 0),
					max: (this.max != null ? this.max : defaultMaxValue),
					step: this.step,
					prefix: this.prefix,
					postfix: this.postfix,
					decimals: this.decimals,
					initval: this.ngModel.$viewValue,
					forcestepdivisibility: this.roundToStep ? 'round' : 'none',
				});

				touchspin.on('change', (): void => {
					this.$scope.$apply((): void => {
						let spinValue: string = touchspin.val();
						this.ngModel.$setViewValue(__string.stringUtility.toNumber(spinValue));
					});
				});

				let unbindViewWatch = this.$scope.$watch((): void => {
					return this.ngModel.$viewValue;
				}, (newValue: any): void => {
					touchspin.val(newValue != null ? newValue.toString() : '');
				});

				// round the model value when it gets set
				// this is different from parsers and formatters because we want to update the actual model value,
				// not just display a formatted value.
				let unbindModelWatch = this.$scope.$watch((): void => {
					return this.ngModel.$modelValue;
				}, (newModel: any): void => {
					this.ngModel.$modelValue = this.round(newModel);
				});

				this.unbindWatches = (): void => {
					unbindViewWatch();
					unbindModelWatch();
				}
			});
		}
	}
}

const spinner: angular.IComponentOptions = buildInput({
	template: require('./spinner.ng1.html'),
	controller: controllerName,
	controllerAs: 'spinner',
	bindings: {
		min: '<?',
		max: '<?',
		step: '<?',
		decimals: '<?',
		prefix: '@',
		postfix: '@',
		roundToStep: '<?',
		ngDisabled: '<?',
		spinnerId: '@',
	},
});

angular.module(moduleName, [inputModule])
	.component(componentName, spinner)
	.controller(controllerName, <any>SpinnerController);
