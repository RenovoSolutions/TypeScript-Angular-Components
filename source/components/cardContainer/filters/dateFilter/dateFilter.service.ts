'use strict';

import * as _ from 'lodash';

import {filters, services} from 'typescript-angular-utilities';
import __date = services.date;

export let factoryName: string = 'rlDateFilterFactory';

export interface IDateFilter extends filters.IFilter {
	selectedDate1: Date;
	selectedDate2: Date;
	includeTime: boolean;
	type: string;
	dateRange: boolean;
}

class DateFilter implements IDateFilter {
	selectedDate1: Date;
	selectedDate2: Date;
	includeTime: boolean = false;
	type: string = 'DateFilter';
	dateRange: boolean = false;

	static $inject = ['valueSelector', __date.serviceName]
	constructor(private valueSelector: string, private dateUtility: __date.IDateUtility) { }

	filter(item: any): boolean {
		if (!this.dateUtility.isDate(this.selectedDate1)) {
			return true;
		}

		if (this.dateRange) {
			let itemDate: Date = this.getValue(item)
			let selectedDate1: Date;
			//have to set the selectedDate1 to a valid Date object for comparisons.
			if (this.includeTime) {
				selectedDate1 = moment(this.selectedDate1).toDate();
			} else {
				//increase it by 1 days. to inlcude the selectec date in the range.
				selectedDate1 = moment(this.selectedDate1).add('days', 1).toDate();
			}
			//validate that the date is in that range.
			//return this.dateUtility.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);
			if (itemDate <= selectedDate1 && itemDate >= this.selectedDate2) {
				return true;
			}
		} else {
			if (this.includeTime) {
				return this.dateUtility.sameDateTime(this.getValue(item), this.selectedDate1);
			} else {
				return this.dateUtility.sameDate(this.getValue(item), this.selectedDate1);
			}
		}
	}

	private getValue(item: any): Date {
		let property = this.valueSelector;
		return item[property];
	}

}

export interface IDateFilterFactory {
	getInstance(valueSelector: string): IDateFilter;
}

dateFilterFactory.$inject = [__date.serviceName];
export function dateFilterFactory(dateUtility: __date.IDateUtility): IDateFilterFactory {
	return {
		getInstance(valueSelector: string): IDateFilter {
			return new DateFilter(valueSelector, dateUtility);
		},
	};
}
