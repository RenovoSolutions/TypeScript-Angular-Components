import * as _ from 'lodash';
import * as moment from 'moment';

import {filters, services, downgrade} from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;

export interface IDateFilterSettings{
	type: string;
	valueSelector: { (item: any): moment.Moment } | string;

	// component settings
	clearButton?: boolean;
	includeDateRange?: boolean;
	includeTime?: boolean;
	label?: string;
}

export interface IDateFilter extends filters.IFilter {
	selectedDate1: moment.Moment;
	selectedDate2: moment.Moment;
	includeTime: boolean;
	type: string;
	dateRange: boolean;

	filter(item: any): boolean;
}

export class DateFilter implements IDateFilter {
	selectedDate1: moment.Moment;
	selectedDate2: moment.Moment;
	includeTime: boolean;
	dateRange: boolean;

	private valueSelector: { (item: any): moment.Moment } | string;
	public type: string;

	// component settings
	clearButton: boolean;
	includeDateRange: boolean;
	label: string;
	template: string;

	private date: __date.IDateUtility;
	private transformService: __transform.ITransformService;

	constructor(settings: IDateFilterSettings
			, dateUtility: __date.IDateUtility
			, transformService: __transform.ITransformService) {
		this.date = dateUtility;
		this.transformService = transformService;

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
		if (!this.date.isDate(this.selectedDate1)) {
			return true;
		}

		if (this.dateRange) {
			let itemDate: moment.Moment = this.getValue(item)
			let selectedDate1: moment.Moment;

			//have to set the selectedDate1 to a valid Date object for comparisons.
			if (this.includeTime) {
				selectedDate1 = moment(this.selectedDate1);
			} else {
				//increase it by 1 days. to inlcude the selectec date in the range.
				selectedDate1 = moment(this.selectedDate1).add(1, 'days');
			}
			return this.date.dateInRange(itemDate, this.selectedDate2, this.selectedDate1);

		} else {
			if (this.includeTime) {
				return this.date.sameDateTime(this.getValue(item), this.selectedDate1);
			} else {
				return this.date.sameDate(this.getValue(item), this.selectedDate1);
			}
		}
	}

	private getValue(item: any): moment.Moment {
		return this.transformService.getValue(item, this.valueSelector);
	}

}
