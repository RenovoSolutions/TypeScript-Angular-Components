// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';

import {IDateFilter} from './dateFilter.service';
import {IDataSource} from '../../datasources/dataSource';

export let directiveName: string = 'rlDateFilter';
export let controllerName: string = 'rlDateFilterController';

// Optional interface for bound attributes
export interface IDateFilterBindings {
    selectedValue: Date;
    filter: IDateFilter;
    source: IDataSource<any>;
    label: string;
    selector: string;
	includeTime: boolean;
	includeDateRange: boolean;
}

export class DateFilterController implements IDateFilterBindings {
    label: string;
    filter: IDateFilter;
    selector: string;
    source: IDataSource<any>;
	includeTime: boolean = false;
	includeDateRange: boolean = false;

    static $inject = ['$scope'];
    constructor(private $scope: angular.IScope) {
		this.filter.includeTime = this.includeTime
	 }

    public get selectedValue(): Date {
        return this.filter.selectedValue;
    }
    public set selectedValue(v: Date) {
        this.filter.selectedValue = v;
        if (this.source != null) {
            this.source.refresh();
        } else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    }
}

export function dateFilter(): angular.IDirective {
    'use strict';
    return {
        restrict: 'E',
        template: require('./dateFilter.html'),
        controller: controllerName,
        controllerAs: 'filter',
        scope: {},
        bindToController: {
            filter: '=',
            source: '=',
            label: '@',
            selector: '=',
			includeTime: '=',
			includeDateRange: '='
        },
    };
}

