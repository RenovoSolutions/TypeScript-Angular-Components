// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __parentChild = services.parentChildBehavior;
import __array = services.array;

import { ITypeaheadBehavior, IGetItemsParams } from '../typeahead/typeahead';

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

	typeaheadLink: __parentChild.IChild<ITypeaheadBehavior>;
	ngModel: angular.INgModelController;

	static $inject: string[] = [__parentChild.serviceName];
	constructor(private parentChild: __parentChild.IParentChildBehaviorService) {}

	$onInit(): void {
		//TODO
	}

	loadItems(search?: string): angular.IPromise<any> {
		return this.getItems({ search: search }).then((data: any[]): any[] => {
			return _.filter(data, (item: any): boolean => {
				return !_.find(this.ngModel.$viewValue, item);
			});
		});
	}

	addItem(item: any): void {
		this.ngModel.$viewValue.push(item);
		this.parentChild.triggerChildBehavior(this.typeaheadLink, (behavior: ITypeaheadBehavior): void => {
			behavior.remove(item);
		});
		this.add({ item: item });
	}

	removeItem(item: any): void {
		__array.arrayUtility.remove(this.ngModel.$viewValue, item);
		this.parentChild.triggerChildBehavior(this.typeaheadLink, (behavior: ITypeaheadBehavior): void => {
			behavior.add(item);
		});
		this.remove({ item: item });
	}
}

let typeaheadList: angular.IComponentOptions = {
	require: { ngModel: 'ngModel' },
	template: require('./typeaheadList.html'),
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		getItems: '&',
		add: '&',
		remove: '&',
		transform: '<?',
		label: '@',
		prefix: '@',
		useClientSearching: '<?',
		ngDisabled: '<?',
	},
};

angular.module(moduleName, [__parentChild.moduleName])
	.component(componentName, typeaheadList)
	.controller(controllerName, TypeaheadListController);
