// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import { IFormValidator } from '../../types/formValidators';
import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.validationGroup';
export var componentName: string = 'rlValidationGroup';
export var controllerName: string = 'ValidationGroupController';

export interface IValidationGroupScope extends angular.IScope {
	validationGroupForm: IFormValidator;
}

export class ValidationGroupController {
	// bindings
	validator: __validation.IValidationHandler;

	groupValidator: IComponentValidator;

	static $inject: string[] = ['$scope', '$timeout', componentValidatorFactoryName];
	constructor(private $scope: IValidationGroupScope
			, private $timeout: angular.ITimeoutService
			, private componentValidatorFactory: IComponentValidatorFactory) {}

	$onInit(): void {
		this.$timeout((): void => {
			if (!_.isUndefined(this.validator)) {
				this.groupValidator = this.componentValidatorFactory.getInstance({
					form: this.$scope.validationGroupForm,
					$scope: this.$scope,
					validators: [this.validator],
				});
			}
		});
	}
}

let validationGroup: angular.IComponentOptions = {
	transclude: true,
	template: require('./validationGroup.html'),
	controller: controllerName,
	controllerAs: 'group',
	bindings: {
		validator: '=',
	},
};

angular.module(moduleName, [componentValidatorModuleName])
	.component(componentName, validationGroup)
	.controller(controllerName, ValidationGroupController);
