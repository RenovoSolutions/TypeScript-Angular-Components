import { Pipe, PipeTransform, Inject } from '@angular/core';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __dateFormats = services.date.defaultFormats;
import __timezone = services.timezone;
import __utc = __timezone.UTC;

/*
 * Filters a string and find all, datetimes that match the format M/D/YYYY H:M:S AM|PM that is used to store dates in message log body text.
 * Assumes they are UTC  and parses them, converts to local browser time replaces them in the string.
 */
@Pipe({ name: 'rlLocalizeStringDates' })
export class LocalizeStringDatesPipe implements PipeTransform {
    private timezoneService: __timezone.ITimezoneService;

	constructor( @Inject(__timezone.timezoneToken) timezoneService: __timezone.ITimezoneService) {
        this.timezoneService = timezoneService;
	}

    transform(input?: string): string {
		if (!input) {
			return '';
		}

		//if no timezone is specified then use moment to get the browsers time zone.
		const timezone: string = this.timezoneService.currentTimezone.momentName;

		// regex to match M/DD/YYYY hh:mm:ss AM|PM with an optional UTC at the end.
		const regex: RegExp = /([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2} ([1-9]|1[0-9])\:([0-9])([0-9])(?:\:([0-9])([0-9]))? (AM|PM)(?: UTC)?/g;

		let messageLogText: string = input;
        let datesToReplace: string[] = messageLogText.match(regex);

		if (datesToReplace != null) {
			//Iterates each date found, reformats it for the current time zone and replaces its original in the string.
            datesToReplace.forEach((date: string) => {
                messageLogText = messageLogText.replace(date, this.formatDate(date, timezone));
            });
        }

		return messageLogText;
    }

	private formatDate(input: string, timezone): string {
		if (!input) {
			return '';
        }

		let momentDate: moment.Moment = moment.tz(input, __dateFormats.dateTimeFormat, __utc.momentName);

        return momentDate.tz(timezone).format(__dateFormats.dateTimeFormat) + ' ' + momentDate.tz(timezone).zoneAbbr();
	}
}