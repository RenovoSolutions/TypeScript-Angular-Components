import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

import { DateFilterComponent } from './dateFilter.component';

interface ITestObj {
	value: moment.Moment;
}

describe('DateFilterComponent', (): void => {
	let dateFilter: DateFilterComponent<any>;

	beforeEach(() => {
		dateFilter = new DateFilterComponent(__date.dateUtility);
		dateFilter.filter = <any>{};
	});

	it('should set useTime on the filter', (): void => {
		dateFilter.useTime = true;

		expect(dateFilter.filter.useTime).to.be.undefined;

		dateFilter.ngOnInit();

		expect(dateFilter.filter.useTime).to.be.true;
	});

	it('should default showClear to true', (): void => {
		expect(dateFilter.showClear).to.be.undefined;

		dateFilter.ngOnInit();

		expect(dateFilter.showClear).to.be.true;

		dateFilter.showClear = false;

		dateFilter.ngOnInit();

		expect(dateFilter.showClear).to.be.false;
	});

	it('should set the date on the filter and refresh the data source', (): void => {
		const date: moment.Moment = moment('2000-01-01T05:16:00.000');
		let dateFrom;
		dateFilter.filter.dateFrom$.subscribe(value => dateFrom = value);

		dateFilter.setDate(date);

		expect(dateFrom).to.equal(date);
	});

	it('should set the dateTo to a number days equal to the count before the dateFrom', (): void => {
		const dateFrom: moment.Moment = moment('2000-01-05T05:16:00.000');
		dateFilter.filter.setDateFrom(dateFrom);
		let dateTo;
		dateFilter.filter.dateTo$.subscribe(value => dateTo = value);

		dateFilter.setCount(4);

		expect(dateTo).to.equalMoment(dateFrom.add('days', 4));
	});

	it('should clear the dateTo if the count is 0', (): void => {
		const originalDateFrom: moment.Moment = moment('2000-01-05T05:16:00.000');
		const originalDateTo: moment.Moment = moment('2000-01-01T05:16:00.000');
		dateFilter.filter.setDateFrom(originalDateFrom);
		dateFilter.filter.setDateTo(originalDateTo);
		let dateTo;
		dateFilter.filter.dateTo$.subscribe(value => dateTo = value);

		dateFilter.setCount(0);

		expect(dateTo).to.be.null;
	});

	it('should set the date to null and count to 0', (): void => {
		const setDateSpy: Sinon.SinonSpy = sinon.spy();
		const setCountSpy: Sinon.SinonSpy = sinon.spy();
		dateFilter.setDate = setDateSpy;
		dateFilter.setCount = setCountSpy;

		dateFilter.clear();

		sinon.assert.calledOnce(setDateSpy);
		sinon.assert.calledWith(setDateSpy, null);
		sinon.assert.calledOnce(setCountSpy);
		sinon.assert.calledWith(setCountSpy, 0);
	});
});
