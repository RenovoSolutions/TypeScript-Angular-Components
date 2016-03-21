'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { INgModelValidator, IFormValidator } from '../../types/formValidators';

export var moduleName: string = 'rl.ui.services.componentValidator';
export var factoryName: string = 'componentValidator';

export interface IComponentValidatorOptions {
	ngModel?: INgModelValidator;
	form?: IFormValidator;
	$scope: angular.IScope;
	validators: __validation.IValidationHandler[];
	setValidity?: { (isValid: boolean): void };
}

export interface IComponentValidator {
	error: string;
}

export class ComponentValidator implements IComponentValidator {
	validator: __validation.ISimpleValidator;
	error: string;
	errorType: string;

	private $scope: angular.IScope;
	private ngModel: INgModelValidator;
	private form: IFormValidator;
	private setValidity: { (isValid: boolean): void };

	constructor(validationService: __validation.IValidationService
			, options: IComponentValidatorOptions) {
		this.$scope = options.$scope;
		this.ngModel = options.ngModel;
		this.form = options.form;

		this.validator = validationService.buildCustomValidator((error: string, name: string): void => {
			this.error = error;
			this.errorType = name || 'customValidation';
		});
		_.each(options.validators, (customValidator: __validation.IValidationHandler): void => {
			this.validator.registerValidationHandler(customValidator);
		});

		this.setValidator();
	}

	private setValidator(): Function {
		return this.$scope.$watch(this.validator.validate.bind(this.validator), (value: boolean): void => {
			if (value) {
				this.error = null;
			}

			if (!_.isUndefined(this.ngModel)) {
				this.ngModel.$setValidity(this.errorType, value);
				this.ngModel.rlErrorMessage = this.error;
			} else if (!_.isUndefined(this.form)) {
				this.form.$setValidity(this.errorType, value, <any>'group');
				this.form.rlErrorMessage = this.error;
			} else if (_.isFunction(this.setValidity)) {
				this.setValidity(value);
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
