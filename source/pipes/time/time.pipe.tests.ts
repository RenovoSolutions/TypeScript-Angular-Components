import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { TimePipe } from './time.pipe';

describe('TimePipe', () => {
	let timePipe: TimePipe;

	beforeEach(() => {
		timePipe = new TimePipe(__object.objectUtility);
	});

	it('should return an empty string when null is specified', (): void => {
		expect(timePipe.transform()).to.equal('');
	});

	it('should return just the time portion of the date', (): void => {
		expect(timePipe.transform(moment.tz('2016-01-02T12:00:00.000-06:00', 'US/Central'))).to.equal('12:00PM');
		expect(timePipe.transform(moment.tz('2016-01-02T08:00:00.000-06:00', 'US/Central'))).to.equal('8:00AM');
		expect(timePipe.transform(moment.tz('2016-01-02T20:00:00.000-06:00', 'US/Central'))).to.equal('8:00PM');
	});
});
