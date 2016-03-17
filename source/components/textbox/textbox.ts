// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.textbox';
export var componentName: string = 'rlTextbox';
export var controllerName: string = 'TextboxController';

export class TextboxController {
	// bindings
	validator: __validation.IValidationHandler;
	label: string;

	ngModel: angular.INgModelController;
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
		if (!_.isUndefined(this.validator)) {
			this.textboxValidator = this.componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: this.$scope,
				validators: [this.validator],
			});
		}
	}
}

let textbox: angular.IComponentOptions = {
	require: { ngModel: 'ngModel' },
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
