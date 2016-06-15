import { Component, Input, Inject, OnInit } from '@angular/core';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __logger = services.logger;

import { INPUT_DIRECTIVES } from '../../../inputs/index';
import { IDateFilter } from './dateFilter.service';
import { IDataSource } from '../../dataSources/dataSource';

const type: string = 'days';

@Component({
	selector: 'rlDateFilter',
	template: require('./dateFilter.html'),
	directives: [INPUT_DIRECTIVES],
})
export class DateFilterComponent implements OnInit {
	@Input() filter: IDateFilter;
	@Input() source: IDataSource<any>;
	@Input() label: string;
	@Input() showClear: boolean;
	@Input() useDateRange: boolean;
	@Input() useTime: boolean;

	count: number = 0;

	private date: __date.IDateUtility;
	private logger: __logger.ILogger;

	constructor( @Inject(__date.dateToken) dateUtility: __date.IDateUtility
			, @Inject(__logger.loggerToken) logger: __logger.ILogger) {
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
		if (this.source != null) {
			this.source.refresh();
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
