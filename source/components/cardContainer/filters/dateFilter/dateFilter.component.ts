import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

import { DateFilter } from './dateFilter.service';
import { IDataSource } from '../../dataSources/dataSource';

const type: moment.UnitOfTime = 'days';

@Component({
	selector: 'rlDateFilter',
	template: require('./dateFilter.html'),
})
export class DateFilterComponent<T> implements OnInit {
	@Input() filter: DateFilter<T>;
	@Input() label: string;
	@Input() showClear: boolean;
	@Input() useDateRange: boolean;
	@Input() useTime: boolean;

	count: number = 0;

	private dateUtility: __date.IDateUtility;

	constructor(dateUtility: __date.DateUtility) {
		this.dateUtility = dateUtility;
	}

	setDate(date: moment.Moment): void {
		this.filter.setDateFrom(date);
	}

	setCount(count: number): void {
		this.count = count || 0;

		if (this.count > 0) {
			const subscription = this.filter.dateFrom$.subscribe(dateFrom => {
				setTimeout(() => {
					subscription.unsubscribe();
					this.filter.setDateTo(moment(dateFrom).subtract((this.count), type));
				});
			});
		} else if (this.count == 0) {
			this.filter.setDateTo(null);
		}
	}

	clear(): void {
		this.setDate(null);
		this.setCount(0);
	}

	ngOnInit(): void {
		this.filter.useTime = this.useTime;
		this.showClear = this.showClear != null ? this.showClear : true;
	}
}
