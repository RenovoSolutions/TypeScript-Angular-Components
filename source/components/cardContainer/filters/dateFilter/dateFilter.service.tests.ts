import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;

import { DateFilter, IDateFilterValue } from './dateFilter.service';

interface ITestObj {
	value: moment.Moment;
}

describe('DateFilter', (): void => {
	let dateFilter: DateFilter;

	beforeEach(() => {
		dateFilter = new DateFilter({
			type: 'dateFilter',
			valueSelector: 'value',
		}, __date.dateUtility, __transform.transform);
	});

	describe('filter value', () => {
		let filterValue: IDateFilterValue;

		beforeEach(() => {
			filterValue = {
				dateFrom: moment('2000-01-01T05:16:00.000'),
				dateTo: moment('1999-11-15T05:16:00.000'),
			};
			(dateFilter as any).value$.next(filterValue);
		});

		it('should get the current date from', () => {
			let dateFrom;
			dateFilter.dateFrom$.subscribe(value => dateFrom = value);
			expect(dateFrom).to.equalMoment(filterValue.dateFrom);
		});

		it('should get the current date to', () => {
			let dateTo;
			dateFilter.dateTo$.subscribe(value => dateTo = value);
			expect(dateTo).to.equalMoment(filterValue.dateTo);
		});

		it('should set the date from', () => {
			let dateFrom;
			dateFilter.dateFrom$.subscribe(value => dateFrom = value);
			let newDateFrom = moment('2016-01-01T05:16:00.000');

			dateFilter.setDateFrom(newDateFrom);

			expect(dateFrom).to.equalMoment(newDateFrom);
		});

		it('should set the date to', () => {
			let dateTo;
			dateFilter.dateTo$.subscribe(value => dateTo = value);
			let newDateTo = moment('2016-01-01T05:16:00.000');

			dateFilter.setDateTo(newDateTo);

			expect(dateTo).to.equalMoment(newDateTo);
		});
	});

	describe('predicate', (): void => {
		it('should return true if the from date is empty', (): void => {
			const item: any = {};
			const filterValue = {
				dateFrom: null,
				dateTo: moment('1999-11-15T05:16:00.000'),
			};
			expect(dateFilter.predicate(item, filterValue)).to.be.true;
		});

		it('should return true if the date falls in the range', (): void => {
			let itemInRange: ITestObj = { value: moment('1999-11-25T08:00:00.000') };
			let itemOnFromDate: ITestObj = { value: moment('2000-01-01T05:16:00.000') };
			let itemOutsideOfRange: ITestObj = { value: moment('2000-03-01T00:00:00.000') };
			const filterValue = {
				dateFrom: moment('2000-01-01T05:16:00.000'),
				dateTo: moment('1999-11-15T05:16:00.000'),
			};
			dateFilter.dateRange = true;

			expect(dateFilter.predicate(itemInRange, filterValue)).to.be.true;
			expect(dateFilter.predicate(itemOnFromDate, filterValue)).to.be.true;
			expect(dateFilter.predicate(itemOutsideOfRange, filterValue)).to.be.false;
		});

		it('should return true if item is the same date if no range is specified', (): void => {
			let itemOnSameDate: ITestObj = { value: moment('2000-01-01T05:16:00.000') };
			let itemOnOtherDate: ITestObj = { value: moment('1999-11-25T08:00:00.000') };
			const filterValue = {
				dateFrom: moment('2000-01-01T05:16:00.000'),
				dateTo: null,
			};

			expect(dateFilter.predicate(itemOnSameDate, filterValue)).to.be.true;
			expect(dateFilter.predicate(itemOnOtherDate, filterValue)).to.be.false;
		});
	});
});
