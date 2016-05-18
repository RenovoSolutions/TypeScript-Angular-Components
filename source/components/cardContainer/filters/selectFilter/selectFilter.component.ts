// /// <reference path='../../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import { ISelectFilter } from './selectFilter.service';
import { IDataSource } from '../../datasources/dataSource';
import { IJQueryUtility, serviceName as jqueryServiceName, moduleName as jqueryModule } from '../../../../services/jquery/jquery.service';

export let componentName: string = 'rlSelectFilter';
export let controllerName: string = 'SelectFilterController';


export interface ISelectFilterBindings {
	filter: ISelectFilter<any>;
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	source: IDataSource<any>;
	label: string;
	transform: string | { (item: any): string };
	nullOption: string;

	// deprecated
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
	transform: string | { (item: any): string };
	nullOption: string;
	template: string;

	selector: string | { (item: any): string };

	static $inject = ['$scope', '$transclude', jqueryServiceName];
	constructor(private $scope: angular.IScope
		, $transclude: angular.ITranscludeFunction
		, jqueryUtility: IJQueryUtility) {
		this.transform = this.transform || this.selector;

		$transclude((clone: angular.IAugmentedJQuery): void => {
			if (clone.length) {
				this.template = jqueryUtility.getHtml(clone);
			}
		});
	}

	public get selectedValue(): any {
		return this.filter.selectedValue;
	}
	public set selectedValue(value: any) {
		this.filter.selectedValue = value;
		if (this.source != null) {
			this.source.refresh();
		} else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
	}
}

export let selectFilter: angular.IComponentOptions = {
	transclude: true,
	template: require('./selectFilter.html'),
	controller: controllerName,
	controllerAs: 'filter',
	bindings: {
		filter: '<',
		options: '<?',
		getOptions: '&',
		source: '<?',
		label: '@',
		transform: '<?',
		nullOption: '@',
		itemAs: '@',

		// deprecated
		selector: '<?',
	},
};
