// /// <reference path='../../../../../typings/commonjs.d.ts' />

import * as angular from 'angular';
import * as _ from 'lodash';

import { IDataSource } from '../../dataSources/index';
import { IFilterGroup, IFilterOption } from './filterGroup.service';

export var componentName: string = 'rlFilterGroup';
export var controllerName: string = 'FilterGroupController';

export interface IFilterGroupBindings {
	icon: string;
	filterGroup: IFilterGroup;
	source: IDataSource<any>;
}

export class FilterGroupController {
	// bindings
	icon: string;
	filterGroup: IFilterGroup;
	source: IDataSource<any>;
	disabled: boolean;

	hasIcon: boolean;
	expanded: boolean;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) {
		this.hasIcon = this.icon != null && this.icon !== '';
		this.expanded = true;
	}

	get headerTitle(): string {
		if (!this.disabled) {
			return this.filterGroup.label + ': ' + this.filterGroup.activeOption.label
		}

		return this.filterGroup.label;
	}

	toggleExpanded(): void {
		this.expanded = !this.expanded;
	}

	get childrenVisible(): boolean {
		return this.expanded && !this.disabled;
	}

	selectOption(option: IFilterOption): void {
		this.filterGroup.activeOption = option;
		this.expanded = false;

		if (this.source != null) {
			this.source.refresh();
		} else {
			this.$scope.$emit('dataSource.requestRefresh'); //*event?
		}
	}
}

export let filterGroup: angular.IComponentOptions = {
	template: require('./filterGroup.directive.ng1.html'),
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		icon: '=',
		filterGroup: '=',
		source: '=',
		disabled: '<',
	},
};
