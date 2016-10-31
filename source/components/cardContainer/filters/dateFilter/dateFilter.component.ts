import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __logger = services.logger;

import { IDateFilterOld } from './dateFilterOld.service';
import { IDataSourceOld } from '../../dataSources/dataSource';

const type: moment.UnitOfTime = 'days';

@Component({
	selector: 'rlDateFilter',
	template: require('./dateFilter.html'),
})
export class DateFilterComponent implements OnInit {
	@Input() filter: IDateFilterOld;
	@Input() dataSource: IDataSourceOld<any>;
	@Input() label: string;
	@Input() showClear: boolean;
	@Input() useDateRange: boolean;
	@Input() useTime: boolean;

	count: number = 0;

	private date: __date.IDateUtility;
	private logger: __logger.ILogger;

	constructor(dateUtility: __date.DateUtility
			, logger: __logger.Logger) {
		this.date = dateUtility;
		this.logger = logger;
	}

	setDate(date: moment.Moment): void {
		this.filter.dateFrom = date;
		this.refreshDataSource();
	}

	setCount(count: number): void {
		this.count = count || 0;

		if (this.count > 0) {
			this.filter.dateRange = true;
			this.filter.dateTo = moment(this.filter.dateFrom).subtract((this.count), type);
		} else if (this.count == 0) {
			//only change this values the first time.
			if (this.filter.dateRange) {
				this.filter.dateRange = false;
				this.filter.dateTo = null;
			}
		}
		this.refreshDataSource();
	}

	clear(): void {
		this.setDate(null);
		this.setCount(0);
	}

	refreshDataSource(): void {
		if (this.dataSource != null) {
			this.dataSource.refresh();
		} else {
			this.logger.log('No source specified');
		}
	}

	ngOnInit(): void {
		this.filter.useTime = this.useTime;
		this.filter.dateRange = false;
		this.showClear = this.showClear != null ? this.showClear : true;
	}
}
