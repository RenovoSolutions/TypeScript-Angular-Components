import { Observable } from 'rxjs';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

import { DateFilterComponent } from './dateFilter.component';

interface ITestObj {
	value: moment.Moment;
}

interface IDateFilterMock {
	setDateFrom: Sinon.SinonSpy;
	setDateTo: Sinon.SinonSpy;
	dateFrom$?: Observable<moment.Moment>;
}

describe('DateFilterComponent', (): void => {
	let dateFilter: DateFilterComponent<any>;
	let filterService: IDateFilterMock;

	beforeEach(() => {
		dateFilter = new DateFilterComponent(__date.dateUtility);
		filterService = {
			setDateFrom: sinon.spy(),
			setDateTo: sinon.spy(),
		}
		dateFilter.filter = <any>filterService;
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

	it('should set the date on the filter', (): void => {
		const date: moment.Moment = moment('2000-01-01T05:16:00.000');

		dateFilter.setDate(date);

		sinon.assert.calledOnce(filterService.setDateFrom);
		sinon.assert.calledWith(filterService.setDateFrom, date);
	});

	it('should set the dateTo to a number days equal to the count before the dateFrom', (): void => {
		const dateFrom: moment.Moment = moment('2000-01-05T05:16:00.000');
		filterService.dateFrom$ = Observable.of(dateFrom);

		dateFilter.setCount(4);

		sinon.assert.calledOnce(filterService.setDateTo);
		expect(filterService.setDateTo.firstCall.args[0]).to.equalMoment(moment('2000-01-01T05:16:00.000'));
	});

	it('should clear the dateTo if the count is 0', (): void => {
		dateFilter.setCount(0);
		sinon.assert.calledOnce(filterService.setDateTo);
		sinon.assert.calledWith(filterService.setDateTo, null);
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
