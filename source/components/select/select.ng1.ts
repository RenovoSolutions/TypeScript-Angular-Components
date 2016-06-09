import 'ui-select';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

import { buildInput, InputController, moduleName as inputModule } from '../input/input.ng1';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../services/componentValidator/componentValidator.service.ng1';
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
	transform: { (item: any): string } | string;
	ngDisabled: boolean;
	nullOption: string;
	select: { (params: ISelectParams): void };
	itemAs: string;

	selector: { (item: any): string } | string;

	loading: boolean;
	template: string;
	showOptions: boolean;

	get selection(): any {
		return this.ngModel.$viewValue;
	}

	set selection(value: any) {
		this.ngModel.$setViewValue(value);
		this.select({ item: this.ngModel.$viewValue });
	}

	static $inject: string[] = ['$scope', '$attrs', '$q', '$transclude', downgrade.objectServiceName, componentValidatorFactoryName, jqueryServiceName];
	constructor($scope: angular.IScope
			, $attrs: angular.IAttributes
			, private $q: angular.IQService
			, $transclude: angular.ITranscludeFunction
			, private object: __object.IObjectUtility
			, componentValidatorFactory: IComponentValidatorFactory
			, jqueryUtility: IJQueryUtility) {
		super($scope, <any>$attrs, componentValidatorFactory);
		this.inputType = 'select';
		this.transform = this.transform || this.selector;

		if (!this.template) {
			$transclude((clone: angular.IAugmentedJQuery): void => {
				if (clone.length) {
					this.template = jqueryUtility.getHtml(clone);
				} else {
					this.template = '{{select.getDisplayName($item)}}';
				}
			});
		}
	}

	$onInit(): void {
		super.$onInit();

		if (_.isUndefined(this.options)) {
			this.loading = true;
			this.loadItems().then((options: any[]): void => {
				this.options = options;
				this.loading = false;
			});
		}
	}

	getDisplayName(item: any): string {
		return __transform.getValue(item, this.transform);
	}

	loadItems(): angular.IPromise<any[]> {
		let promise: angular.IPromise<any[]>;
		promise = this.getOptions();
		if (promise == null) {
			promise = this.$q.when(this.options);
		}
		return promise;
	}

	toggle(): void {
		this.showOptions = !this.showOptions;
	}

	close: { (): void } = () => {
		if (this.showOptions) {
			this.showOptions = false;
		}
	}

	selectOption(value: any): void {
		this.selection = value;
		this.showOptions = false;
	}
}

const select: angular.IComponentOptions = buildInput({
	transclude: true,
	template: require('./select.ng1.html'),
	controller: controllerName,
	controllerAs: 'select',
	bindings: {
		options: '<?',
		getOptions: '&',
		transform: '<?',
		ngDisabled: '<?',
		nullOption: '@',
		select: '&',
		itemAs: '@',

		// deprecated
		selector: '<?',

		// private
		template: '<?',
	},
});

angular.module(moduleName, ['ui.select', downgrade.moduleName, inputModule, jqueryModule])
	.component(componentName, select)
	.controller(controllerName, SelectController);
