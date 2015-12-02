'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

export var moduleName: string = 'rl.ui.services.componentValidator';
export var factoryName: string = 'componentValidator';

export interface IComponentValidatorOptions {
	ngModel?: angular.INgModelController;
	form?: angular.IFormController;
	$scope: angular.IScope;
	validators: __validation.IValidationHandler[];
	setValidity?: { (isValid: boolean): void };
}

export interface IComponentValidator {
	error: string;
}

export class ComponentValidator implements IComponentValidator {
	validator: __validation.IValidator;
	error: string;

	private $scope: angular.IScope;
	private ngModel: angular.INgModelController;
	private form: angular.IFormController;
	private setValidity: { (isValid: boolean): void };

	constructor(validationService: __validation.IValidationService
			, options: IComponentValidatorOptions) {
		this.$scope = options.$scope;
		this.ngModel = options.ngModel;
		this.form = options.form;

		this.validator = validationService.buildCustomValidator((error: string): void => {
			this.error = error;
		});
		_.each(options.validators, (customValidator: __validation.IValidationHandler): void => {
			this.validator.registerValidationHandler(customValidator);
		});

		this.setValidator();
	}

	private setValidator(): Function {
		return this.$scope.$watch(this.validator.validate.bind(this.validator), (value: boolean): void => {
			if (!_.isUndefined(this.ngModel)) {
				this.ngModel.$setValidity('customValidation', value);
			} else if (!_.isUndefined(this.form)) {
				this.form.$setValidity('customValidation', value, <any>'group');
			} else if (_.isFunction(this.setValidity)) {
				this.setValidity(value);
			}

			if (value) {
				this.error = null;
			}
		});
	}
}

export interface IComponentValidatorFactory {
	getInstance(options: IComponentValidatorOptions): IComponentValidator;
}

componentValidatorFactory.$inject = [__validation.serviceName];
export function componentValidatorFactory(validationService: __validation.IValidationService): IComponentValidatorFactory {
	return {
		getInstance(options: IComponentValidatorOptions): IComponentValidator {
			return new ComponentValidator(validationService, options);
		},
	};
}

angular.module(moduleName, [__validation.moduleName])
	.factory(factoryName, componentValidatorFactory);
