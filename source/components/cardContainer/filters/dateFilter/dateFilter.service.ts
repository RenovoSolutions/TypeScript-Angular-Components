'use strict';

import * as _ from 'lodash';
import * as moment from 'moment';

import {filters, services} from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform.transform;

export let factoryName: string = 'rlDateFilterFactory';

export interface IDateFilterSettings{
	type: string;
	valueSelector: { (item: any): Date } | string;

	// component settings
	clearButton: boolean;
	includeDateRange: boolean;
	includeTime: boolean;
	label: string;
}

export interface IDateFilter extends filters.IFilter {
	selectedDate1: Date;
	selectedDate2: Date;
	includeTime: boolean;
	type: string;
	dateRange: boolean;

	filter(item: any): boolean;
}

class DateFilter implements IDateFilter {
	selectedDate1: Date;
	selectedDate2: Date;
	includeTime: boolean;
	dateRange: boolean;

	private valueSelector: { (item: any): Date } | string;
	public type: string;

	// component settings
	clearButton: boolean;
	includeDateRange: boolean;
	label: string;
	template: string;

	constructor(settings: IDateFilterSettings, private dateUtility: __date.IDateUtility) {
		this.valueSelector = settings.valueSelector;
		this.type = settings.type;
		this.clearButton = settings.clearButton;
		this.includeDateRange = settings.includeDateRange;
		this.includeTime = settings.includeTime != null ? settings.includeTime : false;
		this.label = settings.label;
		this.template = `<rl-date-filter filter="filter" source="dataSource" label="{{filter.label}}" include-time="filter.includeTime"
									     include-date-range="filter.includeDateRange" clear-button="filter.clearButton"></rl-date-filter>`;
	}

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
				selectedDate1 = moment(this.selectedDate1).add(1, 'days').toDate();
			}
			return this.dateUtility.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);

		} else {
			if (this.includeTime) {
				return this.dateUtility.sameDateTime(this.getValue(item), this.selectedDate1);
			} else {
				return this.dateUtility.sameDate(this.getValue(item), this.selectedDate1);
			}
		}
	}

	private getValue(item: any): Date {
		return __transform.getValue(item, this.valueSelector);
	}

}

export interface IDateFilterFactory {
	getInstance(settings:IDateFilterSettings): IDateFilter;
}

dateFilterFactory.$inject = [__date.serviceName];
export function dateFilterFactory(dateUtility: __date.IDateUtility): IDateFilterFactory {
	return {
		getInstance(settings:IDateFilterSettings): IDateFilter {
			return new DateFilter(settings, dateUtility);
		},
	};
}
