'use strict';

import * as _ from 'lodash';
import {filters, services} from 'typescript-angular-utilities';
import __date = services.date;

export let factoryName: string = 'rlDateFilterFactory';

export interface IDateFilter extends filters.IFilter {
	selectedValue: any;
	includeTime: boolean;
}

class DateFilter implements IDateFilter {
	selectedValue: any;
	includeTime: boolean = false;
	type: string = 'DateFilter';

	static $inject = ['valueSelector', __date.serviceName]
	constructor(private valueSelector: string, private dateUtility: __date.IDateUtility) { }

	filter(item: any): boolean {
		if (this.selectedValue == null || this.selectedValue === '') {
			return true;
		}
		if (this.includeTime) {
			return this.dateUtility.sameDateTime(this.getValue(item), this.selectedValue);
		} else {
			return this.dateUtility.sameDate(this.getValue(item), this.selectedValue);
		}
	}

	private getValue(item: any): any {
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
