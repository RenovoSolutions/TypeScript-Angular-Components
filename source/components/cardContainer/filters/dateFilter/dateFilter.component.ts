// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';
import * as moment from 'moment';

import {services} from 'typescript-angular-utilities';
import __date = services.date;


import {IDateFilter} from './dateFilter.service';
import {IDataSource} from '../../datasources/dataSource';

export let directiveName: string = 'rlDateFilter';
export let controllerName: string = 'rlDateFilterController';

// Optional interface for bound attributes
enum DateOptions { Day, Week, Month };
export interface IDateFilterBindings {
	clearButton: boolean;
	count: number;
    filter: IDateFilter;
	includeTime: boolean;
	includeDateRange: boolean;
    label: string;
	selectedDate1: string;
	selectedDate2: Date;
    selector: string;
    source: IDataSource<any>;
	type: string;
}

export class DateFilterController implements IDateFilterBindings {
	clearButton: boolean;
	count: number = 0;
    filter: IDateFilter;
	includeDateRange: boolean;
	includeTime: boolean;
    label: string;
    selector: string;
    source: IDataSource<any>;
	type: string = "days"

    static $inject = ['$scope', __date.serviceName];
    constructor(private $scope: angular.IScope, private dateUtility: __date.IDateUtility) {
		this.filter.includeTime = this.includeTime
		if (this.clearButton == null)
			this.clearButton = true;
	}

    public get selectedDate1(): string {
		if (this.filter.selectedDate1 != null) {
			return moment(this.filter.selectedDate1).format('M/D/YYYY');
		} else {
			return null
		}
    }

    public set selectedDate1(v: string) {
		if (this.dateUtility.isDate(v)) {
			this.filter.selectedDate1 = moment(v).toDate();
		} else {
			this.filter.selectedDate1 = null;
		}
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
	clearCount(): void{
		this.count = 0;
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
			this.selectedDate2 = moment(this.selectedDate1).add(this.type, (this.count * -1)).toDate();
		} else if (this.count == 0) {
			//only change this values the first time.
			if (this.filter.dateRange) {
				this.filter.dateRange = false;
				this.selectedDate2 = null;
			}
		}
	}

	increaseCount(): void {
		this.count += 1;
		this.setDateToNow();
		this.countChange();
	}

	setDateToNow(): void {
		if (this.selectedDate1 == null) {
			this.selectedDate1 = moment(Date.now()).format('M/D/YYYY');
		}
	}

	toggle(): void {
		if (this.type === 'days') {
			this.type = 'weeks';
		} else {
			this.type = 'days';
		}
		this.countChange();
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
			includeDateRange: '=',
			clearButton: '='
        },
    };
}

