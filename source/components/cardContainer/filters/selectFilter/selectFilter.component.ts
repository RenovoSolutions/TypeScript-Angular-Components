// /// <reference path='../../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import {ISelectFilter} from './selectFilter.service';
import {IDataSource} from '../../datasources/dataSource';

export let componentName: string = 'rlSelectFilter';
export let controllerName: string = 'SelectFilterController';


export interface ISelectFilterBindings {
	filter: ISelectFilter<any>;
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	source: IDataSource<any>;
	label: string;
	selector: string | { (item: any): string };
	nullOption: string;

}

export interface ISelectFilterController extends ISelectFilterBindings {
	selectedValue: any;
}

export class SelectFilterController implements ISelectFilterController {
	filter: ISelectFilter<any>;
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	source: IDataSource<any>;
	label: string;
	selector: string | { (item: any): string };
	nullOption: string;

	static $inject = ['$scope'];
	constructor(private $scope: angular.IScope) { }

	public get selectedValue(): any {
		return this.filter.selectedValue;
	}
	public set selectedValue(v: any) {
		this.filter.selectedValue = v;
		if (this.source != null) {
			this.source.refresh();
		}else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
	}
}

export let selectFilter: angular.IComponentOptions = {
	template: require('./selectFilter.html'),
	controller: controllerName,
	controllerAs: 'filter',
	bindings: {
		filter: '<',
		options: '<?',
		getOptions: '&',
		source: '<?',
		label: '@',
		selector: '<?',
		nullOption: '@'
	},
};
