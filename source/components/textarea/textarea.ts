// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

import {
	IComponentValidator,
	IComponentValidatorFactory,
	factoryName as componentValidatorFactoryName,
	moduleName as componentValidatorModuleName,
} from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.textarea';
export var directiveName: string = 'rlTextarea';
export var controllerName: string = 'TextareaController';

export class TextareaController {
	// bindings
	name: string;
	rows: number;
	ngDisabled: boolean;
	label: string;
	validator: __validation.IValidationHandler;

	ngModel: angular.INgModelController;
	textareaValidator: IComponentValidator;

	get text(): string {
		return this.ngModel.$viewValue;
	}

	set text(value: string) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$element', '$scope', componentValidatorFactoryName];
	constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory) {
		this.ngModel = $element.controller('ngModel');

		if (!_.isUndefined(this.validator)) {
			this.textareaValidator = componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: $scope,
				validators: [this.validator],
			});
		}
	}
}

export function textarea(): angular.IDirective {
	return {
		restrict: 'E',
		require: 'ngModel',
		template: require('./textarea.html'),
		controller: controllerName,
		controllerAs: 'textarea',
		scope: {},
		bindToController: {
			name: '@',
			rows: '=',
			ngDisabled: '=',
			label: '@',
			validator: '=',
			maxLength: '=',
		},
	};
}

angular.module(moduleName, [componentValidatorModuleName])
	.directive(directiveName, textarea)
	.controller(controllerName, TextareaController);
