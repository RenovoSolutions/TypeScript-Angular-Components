import * as _ from 'lodash';
import * as moment from 'moment';

import {filters, services, downgrade} from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;

export interface IDateFilterSettings{
	type: string;
	valueSelector: { (item: any): moment.Moment } | string;

	// component settings
	showClear?: boolean;
	useDateRange?: boolean;
	useTime?: boolean;
	label?: string;
}

export interface IDateFilter extends filters.IFilter {
	dateFrom: moment.Moment;
	dateTo: moment.Moment;
	useTime: boolean;
	type: string;
	dateRange: boolean;

	filter(item: any): boolean;
}

export class DateFilter implements IDateFilter {
	dateFrom: moment.Moment;
	dateTo: moment.Moment;
	useTime: boolean;
	dateRange: boolean;

	private valueSelector: { (item: any): moment.Moment } | string;
	public type: string;

	// component settings
	showClear: boolean;
	useDateRange: boolean;
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
		this.showClear = settings.showClear;
		this.useDateRange = settings.useDateRange;
		this.useTime = settings.useTime != null ? settings.useTime : false;
		this.label = settings.label;
		this.template = `<rl-date-filter filter="filter" source="dataSource" label="{{filter.label}}" include-time="filter.useTime"
									     include-date-range="filter.useDateRange" clear-button="filter.showClear"></rl-date-filter>`;
	}

	filter(item: any): boolean {
		if (!this.date.isDate(this.dateFrom)) {
			return true;
		}

		if (this.dateRange) {
			let itemDate: moment.Moment = this.getValue(item)
			let dateFrom: moment.Moment;

			//have to set the dateFrom to a valid Date object for comparisons.
			if (this.useTime) {
				dateFrom = moment(this.dateFrom);
			} else {
				//increase it by 1 days. to inlcude the selectec date in the range.
				dateFrom = moment(this.dateFrom).add(1, 'days');
			}
			return this.date.dateInRange(itemDate, this.dateTo, this.dateFrom);

		} else {
			if (this.useTime) {
				return this.date.sameDateTime(this.getValue(item), this.dateFrom);
			} else {
				return this.date.sameDate(this.getValue(item), this.dateFrom);
			}
		}
	}

	private getValue(item: any): moment.Moment {
		return this.transformService.getValue(item, this.valueSelector);
	}

}
