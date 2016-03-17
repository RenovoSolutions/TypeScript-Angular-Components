// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

import { directiveName as requiredDirectiveName, RequiredController } from '../../behaviors/required/required';
import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.textbox';
export var componentName: string = 'rlTextbox';
export var controllerName: string = 'TextboxController';

export interface IInputValidationHandler extends __validation.IValidationHandler {
	name: string;
}

export class TextboxController {
	// bindings
	validator: IInputValidationHandler;
	label: string;

	ngModel: angular.INgModelController;
	required: RequiredController;
	textboxValidator: IComponentValidator;

	get text(): string {
		return this.ngModel.$viewValue;
	}

	set text(value: string) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$scope', componentValidatorFactoryName];
	constructor(private $scope: angular.IScope
			, private componentValidatorFactory: IComponentValidatorFactory) { }

	$onInit(): void {
		let validators: IInputValidationHandler[] = [];

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
			this.textboxValidator = this.componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: this.$scope,
				validators: validators,
			});
		}
	}
}

let textbox: angular.IComponentOptions = {
	require: {
		ngModel: 'ngModel',
		required: '?' + requiredDirectiveName,
	},
	template: require('./textbox.html'),
	controller: controllerName,
	controllerAs: 'textbox',
	bindings: {
		validator: '<?',
		label: '@',
		maxlength: '<?',
	},
};

angular.module(moduleName, [componentValidatorModuleName])
	.component(componentName, textbox)
	.controller(controllerName, TextboxController);
