import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __transform = services.transform;

import { DateFilterOld, IDateFilterValueOld } from './dateFilterOld.service';

interface ITestObj {
	value: moment.Moment;
}

describe('DateFilterOld', (): void => {
	let dateFilter: DateFilterOld;

	beforeEach(() => {
		dateFilter = new DateFilterOld({
			type: 'dateFilter',
			valueSelector: 'value',
		}, __date.dateUtility, __transform.transform);
	});

	describe('filter', (): void => {
		it('should return true if the from date is empty', (): void => {
			const item: any = {};
			dateFilter.dateFrom = null;
			expect(dateFilter.filter(item)).to.be.true;
		});

		it('should return true if the date falls in the range', (): void => {
			let itemInRange: ITestObj = { value: moment('1999-11-25T08:00:00.000') };
			let itemOnFromDate: ITestObj = { value: moment('2000-01-01T05:16:00.000') };
			let itemOutsideOfRange: ITestObj = { value: moment('2000-03-01T00:00:00.000') };

			dateFilter.dateFrom = moment('2000-01-01T05:16:00.000');
			dateFilter.dateTo = moment('1999-11-15T05:16:00.000');
			dateFilter.dateRange = true;

			expect(dateFilter.filter(itemInRange)).to.be.true;
			expect(dateFilter.filter(itemOnFromDate)).to.be.true;
			expect(dateFilter.filter(itemOutsideOfRange)).to.be.false;
		});

		it('should return true if item is the same date if no range is specified', (): void => {
			let itemOnSameDate: ITestObj = { value: moment('2000-01-01T05:16:00.000') };
			let itemOnOtherDate: ITestObj = { value: moment('1999-11-25T08:00:00.000') };

			dateFilter.dateFrom = moment('2000-01-01T05:16:00.000');

			expect(dateFilter.filter(itemOnSameDate)).to.be.true;
			expect(dateFilter.filter(itemOnOtherDate)).to.be.false;
		});
	});

	describe('serialize', (): void => {
		it('should serialize to a date range', (): void => {
			const dateFrom: moment.Moment = moment('2000-01-01T05:16:00.000');
			const dateTo: moment.Moment = moment('1999-11-15T05:16:00.000');

			dateFilter.dateFrom = dateFrom;
			dateFilter.dateTo = dateTo;
			dateFilter.dateRange = true;

			const filterValue: IDateFilterValueOld = dateFilter.serialize();

			expect(filterValue.dateFrom).to.equal(dateFrom);
			expect(filterValue.dateTo).to.equal(dateTo);
		});
	});

	describe('trigger change', (): void => {
		it('should trigger a change when dateFrom or dateTo changes', (): void => {
			const onChangeSpy: Sinon.SinonSpy = sinon.spy();
			dateFilter.onChange = onChangeSpy;

			dateFilter.dateFrom = moment('2000-01-01T05:16:00.000');

			sinon.assert.calledOnce(onChangeSpy);
			onChangeSpy.reset();

			dateFilter.dateTo = moment('2000-01-01T05:16:00.000');

			sinon.assert.calledOnce(onChangeSpy);
		});

		it('should not trigger a change when dateFrom or dateTo is set without changing', (): void => {
			const onChangeSpy: Sinon.SinonSpy = sinon.spy();

			const dateFrom: moment.Moment = moment('2000-01-01T05:16:00.000');
			const dateTo: moment.Moment = moment('1999-11-15T05:16:00.000');

			dateFilter.dateFrom = dateFrom;
			dateFilter.dateTo = dateTo;

			dateFilter.onChange = onChangeSpy;

			dateFilter.dateFrom = dateFrom;

			sinon.assert.notCalled(onChangeSpy);
			dateFilter.onChange = onChangeSpy;

			dateFilter.dateTo = dateTo;

			sinon.assert.notCalled(onChangeSpy);
		});
	});
});
