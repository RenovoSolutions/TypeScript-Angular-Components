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
import { IJQueryUtility, serviceName as jqueryServiceName, moduleName as jqueryModule } from '../../services/jquery/jquery.service';

export const moduleName: string = 'rl.ui.components.select';
export const componentName: string = 'rlSelect';
export const controllerName: string = 'SelectController';

export interface ISelectParams {
	item: any;
}

export class SelectController extends InputController {
	// bindings
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	selector: { (item: any): string } | string;
	ngDisabled: boolean;
	nullOption: string;
	select: { (params: ISelectParams): void };

	loading: boolean;
	template: string;

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
		this.select({ item: this.ngModel.$viewValue });
	}

	static $inject: string[] = ['$scope', '$attrs', '$q', '$transclude', __object.serviceName, componentValidatorFactoryName, jqueryServiceName];
	constructor($scope: angular.IScope
			, $attrs: angular.IAttributes
			, private $q: angular.IQService
			, $transclude: angular.ITranscludeFunction
			, private object: __object.IObjectUtility
			, componentValidatorFactory: IComponentValidatorFactory
			, jqueryUtility: IJQueryUtility) {
		super($scope, <any>$attrs, componentValidatorFactory);
		this.inputType = 'select';
		$transclude((clone: angular.IAugmentedJQuery): void => {
			if (clone.length) {
				this.template = jqueryUtility.getHtml(clone);
			} else {
				this.template = '{{select.getDisplayName($item)}}';
			}
		});
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

const select: angular.IComponentOptions = buildInput({
	transclude: true,
	template: require('./select.html'),
	controller: controllerName,
	controllerAs: 'select',
	bindings: {
		options: '<?',
		getOptions: '&',
		selector: '<?',
		ngDisabled: '<?',
		nullOption: '@',
		select: '&',
	},
});

angular.module(moduleName, ['ui.select', __object.moduleName, inputModule, jqueryModule])
	.component(componentName, select)
	.controller(controllerName, SelectController);
