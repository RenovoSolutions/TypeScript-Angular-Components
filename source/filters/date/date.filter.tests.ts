import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import angularFixture = services.test.angularFixture;
import __object = services.object;

import { DatePipe } from './date.filter';

describe('date filter', () => {
	let datePipe: DatePipe;

	beforeEach(() => {
		datePipe = new DatePipe(__object.objectUtility);
	});

	it('should return an empty string when null is specified', (): void => {
		expect(datePipe.transform()).to.equal('');
	});

	it('should return just the date by default', (): void => {
		expect(datePipe.transform(moment('2016-01-02T12:00:00.000-05:00'))).to.equal('01/02/2016');
		expect(datePipe.transform(moment('2016-10-02T12:00:00.000-05:00'))).to.equal('10/02/2016');
		expect(datePipe.transform(moment('2015-01-02T12:00:00.000-05:00'))).to.equal('01/02/2015');
	});

	it('should return the date with a timestamp and timezone if includeTime is specified', (): void => {
		expect(datePipe.transform(moment('2016-01-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('01/02/2016 12:00 PM EST');
		expect(datePipe.transform(moment('2016-12-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('12/02/2016 12:00 PM EST');
		expect(datePipe.transform(moment('2015-01-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('01/02/2015 12:00 PM EST');
	});

	it('should handle daylight savings time', (): void => {
		expect(datePipe.transform(moment('2016-10-02T12:00:00.000-05:00').tz('US/Eastern'), true)).to.equal('10/02/2016 1:00 PM EDT');
	});
});
