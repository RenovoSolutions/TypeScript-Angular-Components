// /// <reference path='../../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import {ISelectFilter} from './selectFilter.service';
import {IDataSource} from '../../datasources/dataSource';

export let directiveName: string = 'rlSelectFilter';
export let controllerName: string = 'SelectFilterController';


export interface ISelectFilterBindings {
	filter: ISelectFilter<any>;
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	source: IDataSource<any>;
	label: string;
	selector: string | { (item: any): string };

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

	static $inject = ['$scope'];
	constructor(private $scope: angular.IScope) { }

	public get selectedValue(): any {
		return this.filter.selectedValue;
	}
	public set selectedValue(v: any) {
		if (this.source != null) {
			this.source.refresh();
		}else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
		this.filter.selectedValue = v;
	}
}

export function selectFilter(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./selectFilter.html'),
		controller: controllerName,
		controllerAs: 'filter',
		scope: {},
		bindToController: {
			filter: '=',
			options: '=',
			getOptions: '&',
			source: '=',
			label: '@',
			selector:'='
		},
	};
}
