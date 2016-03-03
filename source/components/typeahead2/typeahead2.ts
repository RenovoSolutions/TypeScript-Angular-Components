'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __genericSearch = services.genericSearchFilter;
import __objectUtility = services.object;
import __arrayUtility = services.array;
import __promiseUtility = services.promise;
import __validation = services.validation;

export var moduleName: string = 'rl.ui.components.typeahead2';
export var componentName: string = 'rlTypeaheadTwo';
export var controllerName: string = 'TypeaheadTwoController';

export interface ITypeaheadBindings {
	// summary: IChild object with typeahead behaviors
	childLink: __parentChild.IChild<ITypeaheadBehavior>;

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
	 * Selector for getting the display value for the items
	 */
	transform(item: any): string | string;

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
	 * Option for specifying whether searching should take place on the client or server
	 */
	useClientSearching: boolean;

	/**
	 * Option for disabling the typeahead
	 */
	ngDisabled: boolean;
}

export interface ITypeaheadBehavior {
	add(item: any): void;
	remove(item: any): void;
}

export interface ISelectParams {
	value: any;
	isNew: boolean;
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

export class TypeaheadController {
	// bindings
	childLink: __parentChild.IChild<ITypeaheadBehavior>;
	hasSelection: boolean;
	select: { (params: ISelectParams): void };
	transform: { (item: any): string } | string;
	getItems: { (params?: IGetItemsParams): angular.IPromise<any> };
	label: string;
	useClientSearching: boolean;
	ngDisabled: boolean;

	ngModel: angular.INgModelController;

	private cachedItems: any[];
	private searchFilter: __genericSearch.IGenericSearchFilter;
	visibleItems: any[];
	loading: boolean = false;
	loadDelay: number;
	placeholder: string;
	collapseOnSelect: boolean;
	allowCustomOption: boolean;
	collapsed: boolean;
	hasSearchOption: boolean = false;

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

	private _searchOption: any = {
		__isSearchOption: true,
	};

	static $inject: string[] = ['$scope'
		, '$q'
		, '$attrs'
		, __parentChild.serviceName
		, __genericSearch.factoryName
		, __objectUtility.serviceName
		, __arrayUtility.serviceName
		, __promiseUtility.serviceName];
	constructor(private $scope: angular.IScope
		, private $q: angular.IQService
		, private $attrs: ITypeaheadAttrs
		, private parentChild: __parentChild.IParentChildBehaviorService
		, private genericSearchFactory: __genericSearch.IGenericSearchFilterFactory
		, private object: __objectUtility.IObjectUtility
		, private array: __arrayUtility.IArrayUtility
		, private promise: __promiseUtility.IPromiseUtility) { }

	$onInit(): void {
		this.searchFilter = this.genericSearchFactory.getInstance();
		this.loadDelay = this.useClientSearching ? 100 : 500;
		this.placeholder = this.label != null ? 'Search for ' + this.label.toLowerCase() : 'Search';
		this.collapseOnSelect = this.object.isNullOrEmpty(this.$attrs.select);
		this.allowCustomOption = !this.object.isNullOrEmpty(this.$attrs.create);

		this.parentChild.registerChildBehavior(this.childLink, {
			add: this.addItem.bind(this),
			remove: this.removeItem.bind(this),
		});
	}

	getDisplayName(item: any): string {
		if (item == null) {
			return null;
		}

		if (item.__isSearchOption) {
			return item.text;
		}

		if (this.transform == null) {
			return item;
		}

		return _.isFunction(this.transform)
			? (<{ (item: any): string }>this.transform)(item)
			: item[<string>this.transform];
	}

	refresh(search: string): angular.IPromise<void> {
		if (this.object.isNullOrEmpty(search)) {
			this.visibleItems = [];
			return null;
		}
		return this.loadItems(search).then((): void => {
			this._searchOption.text = search;

			if (this.showCustomSearch(search)) {
				this.hasSearchOption = true;
				this.visibleItems.unshift(this._searchOption);
			}
		});
	}

	loadItems(search: string): angular.IPromise<void> {
		if (!this.useClientSearching) {
			return this.$q.when(this.getItems({
				search: search,
			})).then((items: any[]): void => {
				this.visibleItems = items;
			});
		} else {
			this.searchFilter.searchText = search;

			if (this.cachedItems != null) {
				this.visibleItems = this.filter(this.cachedItems);
				return this.$q.when();
			} else {
				return this.$q.when(this.getItems()).then((items: any[]): void => {
					this.cachedItems = items;
					this.visibleItems = this.filter(items);
				});
			}
		}
	}

	clear(): void {
		this.ngModel.$setViewValue(null);
		this.collapsed = false;
	}

	private showCustomSearch(search: string): boolean {
		return this.allowCustomOption
			&& !this.hasSearchOption
			&& !_.find(this.visibleItems, (item: any): boolean => {
			return this.getDisplayName(item) === search;
		});
	}

	private filter(list: any[]): any[] {
		return _.filter(list, (item: any): boolean => { return this.searchFilter.filter(item); });
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

let typeahead: angular.IComponentOptions = <any>{
	require: { ngModel: 'ngModel' },
	template: require('./typeahead.html'),
	controller: controllerName,
	controllerAs: 'typeahead',
	bindings: {
		childLink: '=?',
		select: '&',
		create: '&',
		transform: '<?',
		getItems: '&',
		label: '@',
		useClientSearching: '<?',
		ngDisabled: '<?',
	},
};

angular.module(moduleName, [
	__parentChild.moduleName
	, __genericSearch.moduleName
	, __objectUtility.moduleName
	, __arrayUtility.moduleName
	, __promiseUtility.moduleName
])
	.component(componentName, typeahead)
	.controller(controllerName, TypeaheadController);