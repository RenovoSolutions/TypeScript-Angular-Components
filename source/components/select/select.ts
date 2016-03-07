// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import 'ui-select';
import 'ui-select/dist/select.css';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;
import __object = services.object;

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
	getOptions: { (): angular.IPromise<any[]> };
	selector: { (item: any): string } | string;
	validator: __validation.IValidationHandler;
	label: string;
	ngDisabled: boolean;
	nullOption: string;

	ngModel: angular.INgModelController;
	selectValidator: IComponentValidator;
	loading: boolean;

	private _nullOption: any = {
		__isNullOption: true,
	};

	get selection(): any {
		return this.ngModel.$viewValue;
	}

	set selection(value: any) {
		if (value.__isNullOption) {
			this.ngModel.$setViewValue(null);
		} else {
			this.ngModel.$setViewValue(value);
		}
	}

	static $inject: string[] = ['$element', '$scope', '$q', componentValidatorFactoryName, __object.serviceName];
	constructor($element: angular.IAugmentedJQuery
			, $scope: angular.IScope
			, private $q: angular.IQService
			, componentValidatorFactory: IComponentValidatorFactory
			, private object: __object.IObjectUtility) {
		this.ngModel = $element.controller('ngModel');

		if (_.isUndefined(this.options)) {
			this.loading = true;
			this.loadItems().then((options: any[]): void => {
				this.options = options;
				this.loading = false;
			});
		} else {
			this.options = this.configureOptions(this.options);
		}

		if (!_.isUndefined(this.validator)) {
			this.selectValidator = componentValidatorFactory.getInstance({
				ngModel: this.ngModel,
				$scope: $scope,
				validators: [this.validator],
			});
		}
	}

	getDisplayName(item: any): string {
		if (item == null) {
			return null;
		}

		if (item.__isNullOption) {
			return this.nullOption;
		}

		if (this.selector == null) {
			return item;
		}

		return _.isFunction(this.selector)
			? (<{ (item: any): string }>this.selector)(item)
			: item[<string>this.selector];
	}

	loadItems(): angular.IPromise<any[]> {
		let promise: angular.IPromise<any[]>;
		promise = this.getOptions();
		if (promise == null) {
			promise = this.$q.when(this.options);
		}
		return promise.then((options: any[]): any[] => { return this.configureOptions(options); });
	}

	configureOptions(options: any[]): any[] {
		if (!this.object.isNullOrWhitespace(this.nullOption)) {
			options.unshift(this._nullOption);
		}

		return options;
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
			options: '<?',
			getOptions: '&',
			selector: '<?',
			validator: '<?',
			label: '@',
			ngDisabled: '<?',
			nullOption: '@',
		},
	};
}

angular.module(moduleName, ['ui.select', componentValidatorModuleName, __object.moduleName])
	.directive(directiveName, select)
	.controller(controllerName, SelectController);
