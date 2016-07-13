import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import { LocalizeStringDatesPipe } from './localizeStringDates.pipe';

describe('LocalizeDateStringPipe', () => {
	let pipe: LocalizeStringDatesPipe;
	let timezoneService: __timezone.TimezoneService;
	let timezones: __timezone.ITimezones;

	beforeEach(() => {
		timezoneService = new __timezone.TimezoneService();
		timezones = new __timezone.Timezones();
		timezoneService.setCurrentTimezone(timezones.EST.offset)
		pipe = new LocalizeStringDatesPipe(timezoneService);
	});

	it('should return an empty string when null or empty string is passed', (): void => {
		expect(pipe.transform()).to.equal('');
		expect(pipe.transform('')).to.equal('');
	});

	it('should format datetime to pacific time', (): void => {
		timezoneService.setCurrentTimezone(timezones.PST.offset);
		expect(pipe.transform('3/16/2016 2:19:00 PM UTC')).to.equal('03/16/2016 7:19 AM PDT');
	});

	it('should return a string with dates localized', (): void => {
		//EST
		let string1: string = 'Arrived time changed from "3/16/2016 3:19:00 PM" to "3/16/2016 3:20:00 PM"';
		let string2: string = 'Arrived time changed from "3/16/2016 3:19:00 PM UTC" to "3/16/2016 3:20:00 PM"';
		let string3: string = 'Arrived time changed from "3/16/2016 3:19:00 PM UTC" to "3/16/2016 3:20:00 PM UTC"';

		let expectedResult: string = 'Arrived time changed from "03/16/2016 11:19 AM EDT" to "03/16/2016 11:20 AM EDT"';

		expect(pipe.transform(string1)).to.equal(expectedResult);
		expect(pipe.transform(string2)).to.equal(expectedResult);
		expect(pipe.transform(string3)).to.equal(expectedResult);
	});

	it('should not format simple date', (): void => {
		expect(pipe.transform('3/16/2016')).to.equal('3/16/2016');
	});

	it('should format simple date with h:mm A', (): void => {
		expect(pipe.transform('3/16/2016 3:19 PM')).to.equal('03/16/2016 11:19 AM EDT');
	});

	it('should format single date with matching M/DD/YYY h:mm:ss A format', (): void => {
		expect(pipe.transform('3/16/2016 12:15:00 AM')).to.equal('03/15/2016 8:15 PM EDT');
	});
});
