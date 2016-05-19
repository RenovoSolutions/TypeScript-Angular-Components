import * as moment from 'moment';

import {  ILocalizeStringDates, moduleName, filterName } from './localizeStringDates.filter';

import { services } from 'typescript-angular-utilities';
import __test = services.test;
import __timezones = services.timezone;


import * as angular from 'angular';
import 'angular-mocks';


describe('localizeDateString', () => {
	let localizeDateString: ILocalizeStringDates;
	const timezone: string = 'America/New_York';
	beforeEach(() => {
		angular.mock.module(moduleName);
		__timezones.timezoneService.setCurrentTimezone(__timezones.timezones.EST.offset)
		let services: any = __test.angularFixture.inject(filterName + 'Filter');
		localizeDateString = services[filterName + 'Filter'];
	});

	it('should return an empty string when no string is passed', (): void => {
		expect(localizeDateString()).to.equal('');
	});
	it('should formate datetime to pacific time', (): void => {
		__timezones.timezoneService.setCurrentTimezone(__timezones.timezones.PST.offset);
		expect(localizeDateString('3/16/2016 2:19:00 PM UTC')).to.equal('03/16/2016 7:19 AM PDT');
	});

	it('should return a string with dates localized', (): void => {
		//EST
		let string1: string = 'Arrived time changed from "3/16/2016 3:19:00 PM" to "3/16/2016 3:20:00 PM"';
		let string2: string = 'Arrived time changed from "3/16/2016 3:19:00 PM UTC" to "3/16/2016 3:20:00 PM"';
		let string3: string = 'Arrived time changed from "3/16/2016 3:19:00 PM UTC" to "3/16/2016 3:20:00 PM UTC"';

		let expectedResult: string = 'Arrived time changed from "03/16/2016 11:19 AM EDT" to "03/16/2016 11:20 AM EDT"';
		expect(localizeDateString(string1)).to.equal(expectedResult);
		expect(localizeDateString(string2)).to.equal(expectedResult);
		expect(localizeDateString(string3)).to.equal(expectedResult);
	});

	it('should not format simple date', (): void => {
		expect(localizeDateString('3/16/2016')).to.equal('3/16/2016');
	});
	it('should format simple date with h:mm A', (): void => {
		expect(localizeDateString('3/16/2016 3:19 PM')).to.equal('03/16/2016 11:19 AM EDT');
	});
	it('should format single date with matching M/DD/YYY h:mm:ss A format', (): void => {
		expect(localizeDateString('3/16/2016 12:15:00 AM')).to.equal('03/15/2016 8:15 PM EDT');
	});
});
