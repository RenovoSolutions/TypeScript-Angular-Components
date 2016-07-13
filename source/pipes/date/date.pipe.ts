import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

import { services } from 'typescript-angular-utilities';
import __dateFormats = services.date.defaultFormats;
import __object = services.object;

@Pipe({ name: 'rlDate' })
export class DatePipe implements PipeTransform {
	private object: __object.IObjectUtility;

	constructor(object: __object.ObjectUtility) {
		this.object = object;
	}

	transform(date?: moment.Moment, includeTime?: boolean): string {
		if (this.object.isNullOrEmpty(date)) {
			return '';
		}

		const momentDate: moment.Moment = moment(date);
		if (includeTime) {
			return momentDate.format(__dateFormats.dateTimeFormat) + ' ' + momentDate.zoneAbbr();
		} else {
			return momentDate.format(__dateFormats.dateFormat);
		}
	}
}
