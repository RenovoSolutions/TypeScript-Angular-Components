// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import 'ui-select';
import 'ui-select/dist/select.css';

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

export var moduleName: string = 'rl.ui.components.select';
export var directiveName: string = 'rlSelect';
export var controllerName: string = 'SelectController';

export class SelectController {
	// bindings
	options: any[];
	getOptions: { (search: string): angular.IPromise<any[]> };
	selector: { (item: any): string } | string;
	validator: __validation.IValidationHandler;
	label: string;
	ngDisabled: boolean;

	ngModel: angular.INgModelController;
	selectValidator: IComponentValidator;

	get selection(): any {
		return this.ngModel.$viewValue;
	}

	set selection(value: any) {
		this.ngModel.$setViewValue(value);
	}

	static $inject: string[] = ['$element', '$scope', componentValidatorFactoryName];
	constructor($element: angular.IAugmentedJQuery, $scope: angular.IScope, componentValidatorFactory: IComponentValidatorFactory) {
		this.ngModel = $element.controller('ngModel');

		if (!_.isUndefined(this.validator)) {
			this.selectValidator = componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: $scope,
				validators: [this.validator],
			});
		}
	}

	getDisplayName(item: any): string {
		return _.isFunction(this.selector)
			? (<{ (item: any): string }>this.selector)(item)
			: item[<string>this.selector];
	}
}

export function select(): angular.IDirective {
	return {
		restrict: 'E',
		require: 'ngModel',
		template: require('./select.html'),
		controller: controllerName,
		controllerAs: 'select',
		scope: {},
		bindToController: {
			options: '=',
			getOptions: '&',
			optionAs: '@',
			selector: '=',
			validator: '=',
			label: '@',
			ngDisabled: '=',
		},
	};
}

angular.module(moduleName, ['ui.select', componentValidatorModuleName])
	.directive(directiveName, select)
	.controller(controllerName, SelectController);
