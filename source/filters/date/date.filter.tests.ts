import { IDateFilter, moduleName, filterName } from './date.filter';

import { services } from 'typescript-angular-utilities';
import angularFixture = services.test.angularFixture;

import * as angular from 'angular';
import 'angular-mocks';
import * as moment from 'moment';

describe('date filter', () => {
	var dateFilter: IDateFilter;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = angularFixture.inject(filterName + 'Filter');
		dateFilter = services[filterName + 'Filter'];
	});

	it('should return an empty string when null is specified', (): void => {
		expect(dateFilter()).to.equal('');
	});

	it('should return just the date by default', (): void => {
		expect(dateFilter(moment('2016-01-02T12:00:00.000-05:00'))).to.equal('01/02/2016');
		expect(dateFilter(moment('2016-10-02T12:00:00.000-05:00'))).to.equal('10/02/2016');
		expect(dateFilter(moment('2015-01-02T12:00:00.000-05:00'))).to.equal('01/02/2015');
	});

	it('should return the date with a timestamp and timezone if includeTime is specified', (): void => {
		expect(dateFilter(moment('2016-01-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('01/02/2016 12:00 PM EST');
		expect(dateFilter(moment('2016-12-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('12/02/2016 12:00 PM EST');
		expect(dateFilter(moment('2015-01-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('01/02/2015 12:00 PM EST');
	});

	it('should handle daylight savings time', (): void => {
		expect(dateFilter(moment('2016-10-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('10/02/2016 1:00 PM EDT');
	});
});
