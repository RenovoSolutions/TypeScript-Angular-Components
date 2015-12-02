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

export var moduleName: string = 'rl.ui.components.validationGroup';
export var directiveName: string = 'rlValidationGroup';
export var controllerName: string = 'ValidationGroupController';

export interface IValidationGroupScope extends angular.IScope {
	validationGroupForm: angular.IFormController;
}

export class ValidationGroupController {
	// bindings
	validator: __validation.IValidationHandler;

	groupValidator: IComponentValidator;

	static $inject: string[] = ['$scope', componentValidatorFactoryName];
	constructor($scope: IValidationGroupScope, componentValidatorFactory: IComponentValidatorFactory) {
		let unbind = $scope.$watch('validationGroupForm', (form: angular.IFormController): void => {
			if (!_.isUndefined(this.validator)) {
				this.groupValidator = componentValidatorFactory.getInstance({
					form: $scope.validationGroupForm,
					$scope: $scope,
					validators: [this.validator],
				});
			}
			unbind();
		});
	}
}

export function validationGroup(): angular.IDirective {
	return {
		restrict: 'E',
		transclude: true,
		template: require('./validationGroup.html'),
		controller: controllerName,
		controllerAs: 'group',
		scope: {},
		bindToController: {
			validator: '=',
		},
	};
}

angular.module(moduleName, [componentValidatorModuleName])
	.directive(directiveName, validationGroup)
	.controller(controllerName, ValidationGroupController);
