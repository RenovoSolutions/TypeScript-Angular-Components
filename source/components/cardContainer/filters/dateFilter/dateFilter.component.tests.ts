import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

import { DateFilterComponent } from './dateFilter.component';

interface ITestObj {
	value: moment.Moment;
}

describe('DateFilterComponent', (): void => {
	let dateFilter: DateFilterComponent;

	beforeEach(() => {
		dateFilter = new DateFilterComponent(__date.dateUtility, <any>{ log: sinon.spy() });
		dateFilter.filter = <any>{};
	});

	it('should set useTime on the filter', (): void => {
		dateFilter.useTime = true;

		expect(dateFilter.filter.useTime).to.be.undefined;

		dateFilter.ngOnInit();

		expect(dateFilter.filter.useTime).to.be.true;
	});

	it('should set dateRange to false on the filter', (): void => {
		expect(dateFilter.filter.dateRange).to.be.undefined;

		dateFilter.ngOnInit();

		expect(dateFilter.filter.dateRange).to.be.false;
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
		const dataSource: any = { refresh: sinon.spy() };
		dateFilter.dataSource = dataSource;
		const date: moment.Moment = moment('2000-01-01T05:16:00.000');

		dateFilter.setDate(date);

		sinon.assert.calledOnce(dataSource.refresh);
		expect(dateFilter.filter.dateFrom).to.equal(date);
	});

	it('should set the dateTo to a number days equal to the count before the dateFrom', (): void => {
		const dataSource: any = { refresh: sinon.spy() };
		dateFilter.dataSource = dataSource;
		const dateFrom: moment.Moment = moment('2000-01-05T05:16:00.000');
		dateFilter.filter.dateFrom = dateFrom;

		dateFilter.setCount(4);

		sinon.assert.calledOnce(dataSource.refresh);
		expect(dateFilter.filter.dateRange).to.be.true;
		expect(dateFilter.filter.dateTo).to.equalMoment(moment('2000-01-01T05:16:00.000'));
	});

	it('should clear the dateTo and set dateRange to false if the count is 0', (): void => {
		const dataSource: any = { refresh: sinon.spy() };
		dateFilter.dataSource = dataSource;
		const dateFrom: moment.Moment = moment('2000-01-05T05:16:00.000');
		const dateTo: moment.Moment = moment('2000-01-01T05:16:00.000');
		dateFilter.filter.dateFrom = dateFrom;
		dateFilter.filter.dateTo = dateTo;
		dateFilter.filter.dateRange = true;

		dateFilter.setCount(0);

		sinon.assert.calledOnce(dataSource.refresh);
		expect(dateFilter.filter.dateRange).to.be.false;
		expect(dateFilter.filter.dateTo).to.be.null;
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