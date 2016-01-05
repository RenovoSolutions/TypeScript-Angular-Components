// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as moment from 'moment';

import {IDateFilter} from './dateFilter.service';
import {IDataSource} from '../../datasources/dataSource';

export let directiveName: string = 'rlDateFilter';
export let controllerName: string = 'rlDateFilterController';

// Optional interface for bound attributes
enum DateOptions { Day, Week, Month };
export interface IDateFilterBindings {
    selectedDate1: Date;
	selectedDate2: Date;
    filter: IDateFilter;
    source: IDataSource<any>;
    label: string;
    selector: string;
	includeTime: boolean;
	includeDateRange: boolean;
	count: number;
}

export class DateFilterController implements IDateFilterBindings {
    label: string;
    filter: IDateFilter;
    selector: string;
    source: IDataSource<any>;
	includeTime: boolean = false;
	includeDateRange: boolean = false;
	moment = moment;
	count: number = 0;

    static $inject = ['$scope'];
    constructor(private $scope: angular.IScope) {
		this.filter.includeTime = this.includeTime
	}

    public get selectedDate1(): Date {
        return this.filter.selectedDate1;
    }

    public set selectedDate1(v: Date) {
        this.filter.selectedDate1 = v;
        if (this.source != null) {
            this.source.refresh();
        } else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    }

	public get selectedDate2(): Date {
        return this.filter.selectedDate2;
    }

    public set selectedDate2(v: Date) {
        this.filter.selectedDate2 = v;
        if (this.source != null) {
            this.source.refresh();
        } else {
            this.$scope.$emit('dataSource.requestRefresh'); //*event?
        }
    }
	setDateToNow(): void {
		if (this.selectedDate1 == null) {
			this.selectedDate1 = moment(Date.now()).toDate();//.format("M/D/YYY");
		}
	}
	increaseCount(): void {
		this.count += 1;
		this.setDateToNow();
		this.countChange();
	}

	decreaseCount(): void {
		this.count -= 1;
		this.setDateToNow();
		//do not allow count below 0
		if (this.count < 0 || this.count === 0) {
			this.count = 0;
		}
		this.countChange();
	}

	countChange(): void {
		if (this.count == null) {
			this.count = 0;
		}
		if (this.count > 0) {
			this.filter.dateRange = true;
			// add days has to be a negative number to go backwords.
			this.selectedDate2 = moment(this.selectedDate1).add('days', (this.count * -1)).toDate();
		} else if (this.count == 0) {
			//only change this values the first time.
			if (this.filter.dateRange) {
				this.filter.dateRange = false;
				this.selectedDate2 = null;
			}
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

