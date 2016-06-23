import * as angular from 'angular';
import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import __search = services.search;
import __objectUtility = services.object;
import __arrayUtility = services.array;
import __validation = services.validation;
import __transform = services.transform.transform;

import { IChild, IParentChildBehaviorService, serviceName as parentChildServiceName, moduleName as parentChildModule } from '../../../services/parentChild/parentChild.service';

import { buildInput, InputController, moduleName as inputModule } from '../input.ng1';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../../services/componentValidator/componentValidator.service.ng1';

export const moduleName: string = 'rl.ui.components.typeahead';
export const componentName: string = 'rlTypeahead';
export const controllerName: string = 'TypeaheadController';

export interface ITypeaheadBindings {
	// summary: IChild object with typeahead behaviors
	childLink: IChild<ITypeaheadBehavior>;

	/**
	 * Event that gets fired with updates to the selection - use if selection adds to a list
	 * @param {any} value The new selection
	 * @param {bool} isNew Indicates whether the selection was picked from the list or selected as the search
	 */
	select(params: ISelectParams): void;

	/**
	 * Event that is used to convert a search text to its object representation - use if the user can specify a custom option
	 * @param {any} value The string value representing the new selection
	 * @returns {any} Object representing the new value to be displayed, if applicable
	 */
	create(params: ICreateParams): any;

	/**
	 * Specifies whether making a selection should collapse the typeahead and show the selection
	 * or just fire an event - defaults to true if no select handler is specified
	 */
	allowCollapse: boolean;

	/**
	 * Selector for getting the display value for the items
	 */
	transform: { (item: any): string } | string;

	/**
	 * Event for loading the data set or searching against the server
	 * @param?: {string} search Search value for the server
	 */
	getItems(params?: IGetItemsParams): angular.IPromise<any>;

	/**
	 * Flower-up label for the typeahead
	 */
	label: string;

	/**
	 * Prefix to show before the label in the placeholder. Default 'Search for'
	 */
	prefix: string;

	/**
	 * Option for specifying whether searching should take place on the client or server
	 */
	useClientSearching: boolean;

	/**
	 * Option for disabling the typeahead
	 */
	ngDisabled: boolean;

	/**
	 * Handler for specifying custom validation logic
	 */
	validator: __validation.IValidationHandler;
}

export interface ITypeaheadBehavior {
	add(item: any): void;
	remove(item: any): void;
}

export interface ISelectParams {
	value: any;
}

export interface IGetItemsParams {
	search: string;
}

export interface ICreateParams {
	value: any;
}

export interface ITypeaheadAttrs extends angular.IAttributes {
	select: string;
	create: string;
}

export class TypeaheadController extends InputController {
	// bindings
	childLink: IChild<ITypeaheadBehavior>;
	hasSelection: boolean;
	select: { (params: ISelectParams): void };
	create: { (params: ICreateParams): any };
	transform: { (item: any): string } | string;
	getItems: { (params?: IGetItemsParams): angular.IPromise<any> };
	prefix: string;
	useClientSearching: boolean;
	ngDisabled: boolean;
	allowCollapse: boolean;

	private cachedItems: any[];
	private getItemsPromise: angular.IPromise<any[]>;
	visibleItems: any[];
	loading: boolean = false;
	loadDelay: number;
	placeholder: string;
	collapseOnSelect: boolean;
	allowCustomOption: boolean;
	collapsed: boolean = false;

	get selection(): any {
		return this.ngModel.$viewValue;
	}

	set selection(value: any) {
		if (value != null) {
			if (value.__isSearchOption) {
				value = this.create({ value: value.text });
			}

			this.select({ value: value });

			if (this.collapseOnSelect) {
				this.collapsed = true;
				this.ngModel.$setViewValue(value);
			}
		}
	}

	_searchOption: any = {
		__isSearchOption: true,
	};

	static $inject: string[] = ['$scope'
		, '$q'
		, '$attrs'
		, '$timeout'
		, parentChildServiceName
		, downgrade.objectServiceName
		, downgrade.arrayServiceName
		, componentValidatorFactoryName];
	constructor($scope: angular.IScope
		, private $q: angular.IQService
		, $attrs: ITypeaheadAttrs
		, private $timeout: angular.ITimeoutService
		, private parentChild: IParentChildBehaviorService
		, private object: __objectUtility.IObjectUtility
		, private array: __arrayUtility.IArrayUtility
		, componentValidatorFactory: IComponentValidatorFactory) {
			super($scope, <any>$attrs, componentValidatorFactory);
			this.inputType = 'typeahead';
		}

	$onInit(): void {
		super.$onInit();

		this.loadDelay = this.useClientSearching ? 100 : 500;
		this.prefix = this.prefix || 'Search for';
		this.placeholder = this.label != null ? this.prefix + ' ' + this.label.toLowerCase() : 'Search';

		let $attrs: ITypeaheadAttrs = <any>this.$attrs;
		this.collapseOnSelect = this.allowCollapse || this.object.isNullOrEmpty($attrs.select);
		this.allowCustomOption = !this.object.isNullOrEmpty($attrs.create);

		this.$timeout((): void => {
			if (this.collapseOnSelect && !this.object.isNullOrEmpty(this.ngModel.$viewValue)) {
				this.collapsed = true;
			}
		});

		this.parentChild.registerChildBehavior(this.childLink, {
			add: this.addItem.bind(this),
			remove: this.removeItem.bind(this),
		});

		this.$scope.$watch((): any => { return this.ngModel.$viewValue; }, (value: any): void => {
			if (value != null && this.collapseOnSelect) {
				this.collapsed = true;
			}
		});
	}

	getDisplayName(item: any): string {
		if (item != null && item.__isSearchOption) {
			return item.text;
		}

		return __transform.getValue(item, this.transform);
	}

	refresh(search: string): angular.IPromise<void> {
		if (this.object.isNullOrEmpty(search)) {
			this.visibleItems = [];
			return null;
		}
		this.loading = true;
		return this.loadItems(search).then((): void => {
			this.loading = false;
			this._searchOption.text = search;

			if (this.showCustomSearch(search)) {
				this.visibleItems.unshift(this._searchOption);
			}
		});
	}

	loadItems(search: string): angular.IPromise<void> {
		if (!this.useClientSearching) {
			return this.getItems({ search: search })
				.then((items: any[]): void => {
					this.visibleItems = items;
				});
		} else {
			return this.getItemsClient()
				.then((items: any[]): void => {
					this.visibleItems = this.filter(items, search);
				});
		}
	}

	private getItemsClient(): angular.IPromise<any[]> {
		if (this.cachedItems != null) {
			return this.$q.when(this.cachedItems);
		}
		//when useClientSearching is enabled, the entire list is loaded and then filtered in-memory
		//caching the promise prevents multiple API calls from being made to load the entire list
		else if (this.getItemsPromise != null) {
			return this.getItemsPromise;
		}
		else {
			return this.getItemsPromise = this.getItems()
				.then((items: any[]): any[] => {
					return this.cachedItems = items;
				});
		}
	}

	clear(): void {
		this.ngModel.$setViewValue(null);
		this.collapsed = false;
	}

	private showCustomSearch(search: string): boolean {
		return this.allowCustomOption
			&& !_.find(this.visibleItems, (item: any): boolean => {
			return this.getDisplayName(item) === search;
		});
	}

	private filter(list: any[], search: string): any[] {
		return _.filter(list, (item: any): boolean => { return __search.searchUtility.tokenizedSearch(item, search); });
	}

	private addItem(item: any): void {
		if (this.cachedItems != null) {
			this.cachedItems.push(item);
		}
	}

	private removeItem(item: any): void {
		if (this.cachedItems != null) {
			this.array.remove(this.cachedItems, item);
		}
	}
}

const typeahead: angular.IComponentOptions = buildInput({
	template: require('./typeahead.ng1.html'),
	controller: controllerName,
	controllerAs: 'typeahead',
	bindings: {
		childLink: '=?',
		select: '&',
		create: '&',
		allowCollapse: '<?',
		transform: '<?',
		getItems: '&',
		prefix: '@',
		useClientSearching: '<?',
		ngDisabled: '<?',
	},
});

angular.module(moduleName, [
	parentChildModule
	, downgrade.moduleName
	, inputModule
])
	.component(componentName, typeahead)
	.controller(controllerName, TypeaheadController);