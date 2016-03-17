// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

import { INgModelValidator } from '../../types/formValidators';
import { directiveName as requiredDirectiveName, RequiredController } from '../../behaviors/required/required';
import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.input';
export var controllerName: string = 'InputController';

export class InputController {
	// bindings
	validator: __validation.IValidationHandler;
	label: string;

	ngModel: INgModelValidator;
	required: RequiredController;
	inputValidator: IComponentValidator;

	get inputValue(): string {
		return this.ngModel.$viewValue;
	}

	set inputValue(value: string) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$scope', componentValidatorFactoryName];
	constructor(protected $scope: angular.IScope
			, private componentValidatorFactory: IComponentValidatorFactory) { }

	$onInit(): void {
		let validators: __validation.IValidationHandler[] = [];

		if (!_.isUndefined(this.validator)) {
			validators.push(this.validator);
		}

		if (this.required != null) {
			validators.push({
				name: 'rlRequired',
				validate: (): boolean => { return !__object.objectUtility.isNullOrEmpty(this.ngModel.$viewValue); },
				errorMessage: this.required.message,
			});
		}

		if (_.some(validators)) {
			this.inputValidator = this.componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: this.$scope,
				validators: validators,
			});
		}
	}
}

export let input: angular.IComponentOptions = {
	require: {
		ngModel: 'ngModel',
		required: '?' + requiredDirectiveName,
	},
	template: '',
	controller: controllerName,
	controllerAs: 'input',
	bindings: {
		validator: '<?',
		label: '@',
	},
};

angular.module(moduleName, [componentValidatorModuleName])
	.controller(controllerName, InputController);
