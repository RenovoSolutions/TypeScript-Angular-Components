// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import 'ui-select';
import 'ui-select/dist/select.css';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

import { buildInput, InputController, moduleName as inputModule } from '../input/input';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../services/componentValidator/componentValidator.service';

export var moduleName: string = 'rl.ui.components.select';
export var componentName: string = 'rlSelect';
export var controllerName: string = 'SelectController';

export class SelectController extends InputController {
	// bindings
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	selector: { (item: any): string } | string;
	ngDisabled: boolean;
	nullOption: string;

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

	static $inject: string[] = ['$scope', '$attrs', '$q', __object.serviceName, componentValidatorFactoryName];
	constructor($scope: angular.IScope
			, $attrs: angular.IAttributes
			, private $q: angular.IQService
			, private object: __object.IObjectUtility
			, componentValidatorFactory: IComponentValidatorFactory) {
		super($scope, <any>$attrs, componentValidatorFactory);
		this.inputType = 'select';
	}

	$onInit(): void {
		super.$onInit();

		if (_.isUndefined(this.options)) {
			this.loading = true;
			this.loadItems().then((options: any[]): void => {
				this.options = options;
				this.loading = false;
			});
		} else {
			this.options = this.configureOptions(this.options);
		}
	}

	getDisplayName(item: any): string {
		if (item != null && item.__isNullOption) {
			return this.nullOption;
		}

		return __transform.getValue(item, this.selector);
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

let select: angular.IComponentOptions = buildInput({
	template: require('./select.html'),
	controller: controllerName,
	controllerAs: 'select',
	bindings: {
		options: '<?',
		getOptions: '&',
		selector: '<?',
		ngDisabled: '<?',
		nullOption: '@',
	},
});

angular.module(moduleName, ['ui.select', __object.moduleName, inputModule])
	.component(componentName, select)
	.controller(controllerName, SelectController);
