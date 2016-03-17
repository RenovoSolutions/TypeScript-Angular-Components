// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import 'ui-select';
import 'ui-select/dist/select.css';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

import { input, InputController, moduleName as inputModule } from '../input/input';

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

	static $inject: string[] = ['$q', __object.serviceName];
	constructor(private $q: angular.IQService
			, private object: __object.IObjectUtility) {}

	$onInit(): void {
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

let select: angular.IComponentOptions = _.clone(input);
select.template = require('./select.html');
select.controller = controllerName;
select.controllerAs = 'select';
select.bindings.options = '<?';
select.bindings.getOptions = '&';
select.bindings.selector = '<?';
select.bindings.ngDisabled = '<?';
select.bindings.nullOption = '@';

angular.module(moduleName, ['ui.select', __object.moduleName])
	.directive(componentName, select)
	.controller(controllerName, SelectController);
