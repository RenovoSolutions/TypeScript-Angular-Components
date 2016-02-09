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
export var directiveName: string = 'rlTextbox';
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

	static $inject: string[] = ['$element', '$scope', componentValidatorFactoryName];
	constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory) {
		this.ngModel = $element.controller('ngModel');

		if (!_.isUndefined(this.validator)) {
			this.textboxValidator = componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: $scope,
				validators: [this.validator],
			});
		}
	}
}

export function textbox(): angular.IDirective {
	return {
		restrict: 'E',
		require: 'ngModel',
		template: require('./textbox.html'),
		controller: controllerName,
		controllerAs: 'textbox',
		scope: {},
		bindToController: {
			validator: '=',
			label: '@',
			maxlength: '=',
		},
	};
}

angular.module(moduleName, [componentValidatorModuleName])
	.directive(directiveName, textbox)
	.controller(controllerName, TextboxController);
