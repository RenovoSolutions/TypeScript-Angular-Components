// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __array = services.array;
import __transform = services.transform.transform;
import __search = services.search;

import { ITypeaheadBehavior, IGetItemsParams } from '../typeahead/typeahead';
import { typeaheadItem, componentName as itemComponentName } from './typeaheadItem';

import { IChangeObject } from '../../types/changes';

export const moduleName: string = 'rl.ui.components.typeaheadList';
export const componentName: string = 'rlTypeaheadList';
export const controllerName: string = 'TypeaheadListController';

export interface ITypeaheadListBindings {
	/**
	 * Event for loading the data set or searching against the server
	 * @param?: {string} search Search value for the server
	 */
	getItems: { (params?: IGetItemsParams): angular.IPromise<any> };

	/**
	 * Event that is fired when an item is added to the list
	 * @param?: {object} item The item that was added
	 */
	add: { (params?: IAddParams): angular.IPromise<void> };

	/**
	 * Event that is fired when an item is removed from the list
	 * @param?: {object} item The item that was removed
	 */
	remove: { (params?: IRemoveParams): angular.IPromise<void> };

	/**
	 * Selector for getting the display value for the items
	 */
	transform: { (item: any): string } | string;

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
	 * Alias for the item in the transclude list item template
	 */
	itemAs: string;

	/**
	 * Link for telling the typeahead list to add or remove an item from outside
	 */
	childLink: __parentChild.IChild<ITypeaheadListBehavior>;

	/**
	 * Data that is shared between all list items
	 */
	listData: any;

	/**
	 * Turn off searching capabilities and use a simple dropdown for selection
	 */
	disableSearching: boolean;
}

export interface ITypeaheadListScope extends angular.IScope {
	$remove(item: any): void;
	$transform(item: any): string;
	listData: any;
}

export interface ITypeaheadListBehavior {
	add(item: any): void;
	remove(item: any): void;
}

export interface IAddParams {
	item: any;
}

export interface IRemoveParams {
	item: any;
}

export interface ITypeaheadListChanges {
	disableSearching: IChangeObject<boolean>;
}

export class TypeaheadListController implements ITypeaheadListBindings {
	// bindings
	getItems: { (params?: IGetItemsParams): angular.IPromise<any> };
	add: { (params?: IAddParams): angular.IPromise<void> };
	remove: { (params?: IRemoveParams): angular.IPromise<void> };
	transform: { (item: any): string } | string;
	label: string;
	prefix: string;
	useClientSearching: boolean;
	ngDisabled: boolean;
	itemAs: string;
	childLink: __parentChild.IChild<ITypeaheadListBehavior>;
	listData: any;
	disableSearching: boolean;

	ngModel: angular.INgModelController;
	cachedItems: any[];
	// current selection. Should always be null
	model: any;

	static $inject: string[] = ['$scope', '$transclude', '$q', __parentChild.serviceName];
	constructor(private $scope: ITypeaheadListScope
			, public $transclude: angular.ITranscludeFunction
			, private $q: angular.IQService
			, private parentChild: __parentChild.IParentChildBehaviorService) { }

	$onInit(): void {
		this.$scope.$remove = this.removeItem.bind(this);
		this.$scope.$transform = (item: any): string => {
			return __transform.getValue(item, this.transform);
		};
		this.$scope.listData = this.listData;
		this.parentChild.registerChildBehavior(this.childLink, {
			add: this.addItem.bind(this),
			remove: this.removeItem.bind(this),
		});
	}

	$onChanges(changes: ITypeaheadListChanges): void {
		if (changes.disableSearching && changes.disableSearching.currentValue) {
			this.searchItems().then((items: any[]): void => {
				this.cachedItems = items;
			});
		}
	}

	loadItems(search?: string): angular.IPromise<any[]> {
		if (this.useClientSearching || this.disableSearching) {
			if (this.cachedItems != null) {
				return this.$q.when(this.cachedItems);
			} else {
				return this.$q.when(this.getItems());
			}
		} else {
			return this.getItems({ search: search });
		}
	}

	searchItems(search?: string): angular.IPromise<any> {
		return this.loadItems(search).then((items: any[]): any[] => {
			return this.filter(items, search);
		});
	}

	addItem(item: any): angular.IPromise<any> {
		return this.$q.when(this.add({ item: item })).then((newItem: any): void => {
			newItem = newItem || item;
			this.ngModel.$viewValue.push(newItem);
			this.ngModel.$setDirty();
			if (this.cachedItems != null) {
				__array.arrayUtility.remove(this.cachedItems, item);
			}
			this.model = null;
			return newItem;
		});
	}

	removeItem(item: any): angular.IPromise<void> {
		return this.$q.when(this.remove({ item: item })).then((): void => {
			__array.arrayUtility.remove(this.ngModel.$viewValue, item);
			this.ngModel.$setDirty();
			if (this.cachedItems != null) {
				this.cachedItems.push(item);
			}
		});
	}

	private filter(list: any[], search: string): any[] {
		const filteredList: any[] = _.filter(list, (item: any): boolean => {
			return !_.find(this.ngModel.$viewValue, item);
		});

		if (this.useClientSearching) {
			this.cachedItems = filteredList;
			return _.filter(filteredList, (item: any): boolean => { return __search.searchUtility.tokenizedSearch(item, search); });
		} else {
			return filteredList;
		}
	}
}

const typeaheadList: angular.IComponentOptions = {
	require: { ngModel: 'ngModel' },
	transclude: <any>{
		headerSlot: '?rlListHeader',
		listItemSlot: '?rlListItem',
	},
	template: require('./typeaheadList.html'),
	controller: controllerName,
	controllerAs: 'list',
	bindings: {
		getItems: '&',
		add: '&',
		remove: '&',
		transform: '<?',
		label: '@',
		prefix: '@',
		useClientSearching: '<?',
		ngDisabled: '<?',
        itemAs: '@',
		childLink: '=?',
		listData: '<?',
		disableSearching: '<?',
	},
};

angular.module(moduleName, [__parentChild.moduleName])
	.component(componentName, typeaheadList)
	.controller(controllerName, TypeaheadListController)
	.component(itemComponentName, typeaheadItem);
