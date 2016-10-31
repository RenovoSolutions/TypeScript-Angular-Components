import { Observable } from 'rxjs';
import { clone } from 'lodash';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;

import { IFilter, Filter } from '../filter';

export interface IDateFilterValue {
	dateFrom: moment.Moment;
	dateTo: moment.Moment;
}

export interface IDateFilterSettings{
	type: string;
	valueSelector: { (item: any): moment.Moment } | string;

	// // component settings
	// showClear?: boolean;
	// useDateRange?: boolean;
	// useTime?: boolean;
	// label?: string;
}

export interface IDateFilter extends IFilter<any, IDateFilterValue> {
	dateFrom$: Observable<moment.Moment>;
	dateTo$: Observable<moment.Moment>;
	useTime: boolean;
	type: string;
	dateRange: boolean;
}

export class DateFilter extends Filter<any, IDateFilterValue> implements IDateFilter {
	useTime: boolean;
	dateRange: boolean;

	private _dateFrom: moment.Moment;
	private _dateTo: moment.Moment;
	private valueSelector: { (item: any): moment.Moment } | string;
	public type: string;

	// component settings
	showClear: boolean;
	useDateRange: boolean;
	label: string;
	template: string;

	private date: __date.IDateUtility;
	private transformService: __transform.ITransformService;

	get dateFrom$(): Observable<moment.Moment> {
		return this.value$.asObservable().map(value => value.dateFrom);
	}

	get dateTo$(): Observable<moment.Moment> {
		return this.value$.asObservable().map(value => value.dateTo);
	}

	constructor(settings: IDateFilterSettings
			, dateUtility: __date.IDateUtility
			, transformService: __transform.ITransformService) {
		super();

		this.date = dateUtility;
		this.transformService = transformService;

		this.valueSelector = settings.valueSelector;
		this.type = settings.type;
		// this.showClear = settings.showClear;
		// this.useDateRange = settings.useDateRange;
		// this.useTime = settings.useTime != null ? settings.useTime : false;
		// this.label = settings.label;
		// this.template = `<rl-date-filter filter="filter" source="dataSource" label="{{filter.label}}" include-time="filter.useTime"
		// 							     include-date-range="filter.useDateRange" clear-button="filter.showClear"></rl-date-filter>`;
	}

	setDateFrom(value: moment.Moment): void {
		const updatedValue = clone(this.value$.getValue());
		updatedValue.dateFrom = value;
		this.value$.next(updatedValue);
	}

	setDateTo(value: moment.Moment): void {
		const updatedValue = clone(this.value$.getValue());
		updatedValue.dateTo = value;
		this.value$.next(updatedValue);
	}

	predicate = (item: any, filterValue: IDateFilterValue): boolean => {
		if (!this.date.isDate(filterValue.dateFrom)) {
			return true;
		}

		if (this.dateRange) {
			let itemDate: moment.Moment = this.getValue(item)
			let dateFrom: moment.Moment;

			//have to set the dateFrom to a valid Date object for comparisons.
			if (this.useTime) {
				dateFrom = moment(filterValue.dateFrom);
			} else {
				//increase it by 1 days. to inlcude the selected date in the range.
				dateFrom = moment(filterValue.dateFrom).add(1, 'days');
			}
			return this.date.dateInRange(itemDate, filterValue.dateTo, filterValue.dateFrom);

		} else {
			if (this.useTime) {
				return this.date.sameDateTime(this.getValue(item), filterValue.dateFrom);
			} else {
				return this.date.sameDate(this.getValue(item), filterValue.dateFrom);
			}
		}
	}

	private getValue(item: any): moment.Moment {
		return this.transformService.getValue(item, this.valueSelector);
	}
}
