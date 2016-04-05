// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __array = services.array;
import __transform = services.transform.transform;

import { ITypeaheadBehavior, IGetItemsParams } from '../typeahead/typeahead';
import { typeaheadItem, componentName as itemComponentName } from './typeaheadItem';

export let moduleName: string = 'rl.ui.components.typeaheadList';
export let componentName: string = 'rlTypeaheadList';
export let controllerName: string = 'TypeaheadListController';

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

	typeaheadLink: __parentChild.IChild<ITypeaheadBehavior> = <any>{};
	ngModel: angular.INgModelController;

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

	loadItems(search?: string): angular.IPromise<any> {
		return this.getItems({ search: search }).then((data: any[]): any[] => {
			return _.filter(data, (item: any): boolean => {
				return !_.find(this.ngModel.$viewValue, item);
			});
		});
	}

	addItem(item: any): angular.IPromise<any> {
		return this.$q.when(this.add({ item: item })).then((newItem: any): void => {
			newItem = newItem || item;
			this.ngModel.$viewValue.push(newItem);
			this.parentChild.triggerChildBehavior(this.typeaheadLink, (behavior: ITypeaheadBehavior): void => {
				behavior.remove(newItem);
			});
			return newItem;
		});
	}

	removeItem(item: any): angular.IPromise<void> {
		return this.$q.when(this.remove({ item: item })).then((): void => {
			__array.arrayUtility.remove(this.ngModel.$viewValue, item);
			this.parentChild.triggerChildBehavior(this.typeaheadLink, (behavior: ITypeaheadBehavior): void => {
				behavior.add(item);
			});
		});
	}
}

let typeaheadList: angular.IComponentOptions = {
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
	},
};

angular.module(moduleName, [__parentChild.moduleName])
	.component(componentName, typeaheadList)
	.controller(controllerName, TypeaheadListController)
	.component(itemComponentName, typeaheadItem);
