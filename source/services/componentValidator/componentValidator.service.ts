'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

export var moduleName: string = 'rl.ui.services.componentValidator';
export var factoryName: string = 'componentValidator';

export interface IComponentValidatorOptions {
	ngModel: angular.INgModelService;
	$scope: angular.IScope;
	validators: __validation.IValidationHandler[];
}

export interface IComponentValidator {
	error: string;
}

export class ComponentValidator implements IComponentValidator {
	validator: __validation.IValidator;
	error: string;

	private $scope: angular.IScope;
	private ngModel: angular.INgModelController;

	constructor(validationService: __validation.IValidationService
			, options: IComponentValidatorOptions) {
		this.$scope = options.$scope;
		this.ngModel = options.ngModel

		this.validator = validationService.buildCustomValidator((error: string): void => {
			this.error = error;
		});
		_.each(options.validators, (customValidator: __validation.IValidationHandler): void => {
			this.validator.registerValidationHandler(customValidator);
		});

		let unregisterValidator: Function;

		this.$scope.$watch((): boolean => { return this.ngModel.$dirty; }, (value: boolean): void => {
			if (value) {
				unregisterValidator = this.setValidator();
			} else {
				if (_.isFunction(unregisterValidator)) {
					unregisterValidator();
				}
			}
		});
	}

	private setValidator(): Function {
		return this.$scope.$watch(this.validator.validate.bind(this.validator), (value: boolean): void => {
			this.ngModel.$setValidity('customValidation', value);

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
