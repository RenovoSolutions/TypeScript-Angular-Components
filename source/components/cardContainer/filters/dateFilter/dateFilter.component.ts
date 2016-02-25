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
	type: string = "days";
	private inputField: angular.IAugmentedJQuery;

	static $inject = ['$scope', __date.serviceName, '$element'];
	constructor(private $scope: angular.IScope, private dateUtility: __date.IDateUtility, private $element: angular.IAugmentedJQuery) {
		this.filter.includeTime = this.includeTime
		//this is added to address an agular quirk on the service event list page.
		//the input field was not clearing correclty when the selectedDate1 value is null.
		this.inputField = this.$element.find('rl-date-time input');
		this.filter.dateRange = false;
		if (this.clearButton == null)
			this.clearButton = true;
	}

	public get selectedDate1(): string {
		if (this.filter.selectedDate1 != null) {
			return moment(this.filter.selectedDate1).format('M/D/YYYY');
		} else {
			//clear input field of date value. and rest past day/week count
			this.inputField.val('');
			this.clearCount();
			return null
		}
	}

	public set selectedDate1(v: string) {
		if (this.dateUtility.isDate(v)) {
			this.filter.selectedDate1 = moment(v).toDate();
		} else {
			//clear input field of date value. and rest past day/week count
			this.inputField.val('');
			this.clearCount();
			this.filter.selectedDate1 = null;
		}
		this.refreshDataSource();
	}

	public get selectedDate2(): Date {
		return this.filter.selectedDate2;
	}

	public set selectedDate2(v: Date) {
		this.filter.selectedDate2 = v;
		this.refreshDataSource();
	}

	refreshDataSource(): void {
		if (this.source != null) {
			this.source.refresh();
		} else {
			this.$scope.$emit('dataSource.requestRefresh'); //*event?
		}
	}
	clearCount(): void {
		this.count = 0;
		this.countChange();
	}

	decreaseCount(): void {
		this.count -= 1;
		this.setDateTimeNowIfNull();
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
			this.selectedDate2 = moment(this.selectedDate1).add((this.count * -1), this.type).toDate();
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
		this.setDateTimeNowIfNull();
		this.countChange();
	}

	setDateTimeNowIfNull(): void {
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

