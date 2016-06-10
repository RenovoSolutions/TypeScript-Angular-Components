import * as angular from 'angular';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __date = services.date;
import __object = services.object;
import __timezones = services.timezone;


export var moduleName: string = 'rl21.ui.filters.localizeStringDates';
export var filterName: string = 'rlLocalizeStringDates';

export interface ILocalizeStringDates {
	(input?: string): string;
}

/**
 *Filters a string and find all, datetimes that match the format M/D/YYYY H:M:S AM|PM that is used to store dates in message log body text.
* Assumes they are UTC  and parses them, converts to local browser time replaces them in the string.
 */
export function localizeStringDates(): ILocalizeStringDates {
	'use strict';
	return (input?: string): string => {
		if (input == null) {
			return '';
		}

		//if no timezone is specified then use moment to get the browsers time zone.
		const timezone: string = __timezones.timezoneService.currentTimezone.momentName;

		// regex to match M/DD/YYYY hh:mm:ss AM|PM with an optional UTC at the end.
		const regex: RegExp = /([1-9]|1[0-2])\/([1-9]|1\d|2\d|3[01])\/(19|20)\d{2} ([1-9]|1[0-9])\:([0-9])([0-9])(?:\:([0-9])([0-9]))? (AM|PM)(?: UTC)?/g;

		let messageLogText: string = input;
		let datesToReplace: string[] = messageLogText.match(regex);
		//if there where no dates found by the RegExp return the value passed the list.
		if (datesToReplace == null) {
			return messageLogText;
		}
		// Iterates each date found, reformats it for the current time zone and replace's it's original in the string.
		datesToReplace.forEach((date: string) => {
			messageLogText = messageLogText.replace(date, formatDate(date, timezone));
		});

		return messageLogText;
	};
	function formatDate(date: string, timezone): string {
		'use strict';
		if (__object.objectUtility.isNullOrEmpty(date)) {
			return '';
		}
		let momentDate: moment.Moment = moment.tz(date, __date.defaultFormats.dateTimeFormat, __timezones.UTC.momentName);
		return momentDate.tz(timezone).format(__date.defaultFormats.dateTimeFormat) + ' ' + momentDate.tz(timezone).zoneAbbr();

	}
}


angular.module(moduleName, [])
	.filter(filterName, localizeStringDates);