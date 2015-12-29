'use strict';

import * as _ from 'lodash';
import {filters, services} from 'typescript-angular-utilities';
import __date = services.date;

export let factoryName: string = 'DateFilter';

export interface IDateFilter extends filters.IFilter {
	selectedValue: any;
}

class DateFilter implements IDateFilter {
	selectedValue: any;
	type: string = 'DateFilter';

	static $inject = ['valueSelector', __date.serviceName]
	constructor(private valueSelector: string, private dateUtility: __date.IDateUtility) { }

	filter(item: any): boolean {
		if (this.selectedValue == null) {
			return true;
		}
		return this.dateUtility.sameDate(this.getValue(item), this.selectedValue);
	}

	private getValue(item: any): any {
		let property = this.valueSelector;
		return item[property];
	}

}

export interface IDateFilterFactory {
	getInstance(valueSelector: string): IDateFilter;
}

this.$inject = [__date.serviceName];
export function dateFilterFactory(dateUtility: __date.IDateUtility): IDateFilterFactory {
	return {
		getInstance(valueSelector: string): IDateFilter {
			return new DateFilter(valueSelector, dateUtility);
		},
	};
}
