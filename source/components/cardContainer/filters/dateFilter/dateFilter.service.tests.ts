import * as angular from 'angular';
import 'angular-mocks';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __test = services.test;

import {moduleName, factoryName, IDateFilter, IDateFilterFactory } from './dateFilter.module';

interface ITestObj {
	value: moment.Moment;
}

describe('dateFilter', (): void => {
    let dateFilter: IDateFilter;

	beforeEach(() => {
        angular.mock.module(moduleName);
        let services: any = __test.angularFixture.inject(factoryName);
		let dateFilterFactory: IDateFilterFactory = services[factoryName]
		dateFilter = dateFilterFactory.getInstance({
			type: 'dateFilter',
			valueSelector: 'value',
		});
	});

    it('dateFilter should return true', (): void => {
		let item: ITestObj = { value: moment('2000-01-01T05:16:00.000') };
		let item2: ITestObj = { value: moment('2000-03-01T00:00:00.000') };
		let item3: ITestObj = { value: moment('1999-11-25T08:00:00.000') };

		dateFilter.selectedDate1 = moment('2000-01-01T05:16:00.000');

        expect(dateFilter.filter(item)).to.be.true;
        expect(dateFilter.filter(item2)).to.be.false;

		dateFilter.selectedDate2 = moment('1999-11-15T05:16:00.000');
		dateFilter.dateRange = true;

        expect(dateFilter.filter(item)).to.be.true;
        expect(dateFilter.filter(item2)).to.be.false;
        expect(dateFilter.filter(item3)).to.be.true;

		//checking selectedDate1 null;
		dateFilter.selectedDate1 = null;
        expect(dateFilter.filter(item)).to.be.true;

	});
});