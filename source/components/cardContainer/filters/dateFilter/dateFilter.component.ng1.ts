// /// <reference path='../../../typings/node/node.d.ts' />

import * as angular from 'angular';
import * as moment from 'moment';

import { services, downgrade } from 'typescript-angular-utilities';
import __date = services.date;

import {IDateFilterOld} from './dateFilterOld.service';
import {IDataSourceOld} from '../../dataSources/dataSource';

export let componentName: string = 'rlDateFilter';
export let controllerName: string = 'rlDateFilterController';

// Optional interface for bound attributes
enum DateOptions { Day, Week, Month };
export interface IDateFilterBindings {
	clearButton: boolean;
	count: number;
	filter: IDateFilterOld;
	includeTime: boolean;
	includeDateRange: boolean;
	label: string;
	dateFrom: moment.Moment;
	dateTo: moment.Moment;
	source: IDataSourceOld<any>;
	type: string;
}

export class DateFilterController implements IDateFilterBindings {
	clearButton: boolean;
	count: number = 0;
	filter: IDateFilterOld;
	includeDateRange: boolean;
	includeTime: boolean;
	label: string;
	source: IDataSourceOld<any>;
	type: moment.UnitOfTime = 'days';
	private inputField: angular.IAugmentedJQuery;

	dateFrom: moment.Moment;

	static $inject = ['$scope', downgrade.dateServiceName, '$element'];
	constructor(private $scope: angular.IScope, private dateUtility: __date.IDateUtility, private $element: angular.IAugmentedJQuery) {
		this.filter.useTime = this.includeTime
		//this is added to address an agular quirk on the service event list page.
		//the input field was not clearing correclty when the dateFrom value is null.
		this.inputField = this.$element.find('rl-date-time input');
		this.filter.dateRange = false;
		if (this.clearButton == null)
			this.clearButton = true;

		$scope.$watch('filter.dateFrom', (date: moment.Moment): void => {
			if (date == null) {
				this.inputField.val('');
				this.clearCount();
			}
			this.filter.dateFrom = date;
			this.refreshDataSource();
		});
	}

	// public get dateFrom(): moment.Moment {
	// 	if (this.filter.dateFrom != null) {
	// 		return moment(this.filter.dateFrom);
	// 	} else {
	// 		return null;
	// 	}
	// }

	// public set dateFrom(dateString: moment.Moment) {
	// 	if (this.dateUtility.isDate(dateString)) {
	// 		this.filter.dateFrom = moment(dateString);
	// 	} else {
	// 		//clear input field of date value. and rest past day/week count
	// 		this.inputField.val('');
	// 		this.clearCount();
	// 		this.filter.dateFrom = null;
	// 	}
	// 	this.refreshDataSource();
	// }

	public get dateTo(): moment.Moment {
		return this.filter.dateTo;
	}

	public set dateTo(date: moment.Moment) {
		this.filter.dateTo = date;
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
			this.dateTo = moment(this.dateFrom).add((this.count * -1), this.type);
		} else if (this.count == 0) {
			//only change this values the first time.
			if (this.filter.dateRange) {
				this.filter.dateRange = false;
				this.dateTo = null;
			}
		}
	}

	increaseCount(): void {
		this.count += 1;
		this.setDateTimeNowIfNull();
		this.countChange();
	}

	setDateTimeNowIfNull(): void {
		if (this.dateFrom == null) {
			this.dateFrom = this.dateUtility.getNow();
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

export let dateFilter: angular.IComponentOptions = {
	template: require('./dateFilter.ng1.html'),
	controller: controllerName,
	controllerAs: 'filter',
	bindings: {
		filter: '<',
		source: '<?',
		label: '@',
		includeTime: '<?',
		includeDateRange: '<?',
		clearButton: '<?'
	},
};
