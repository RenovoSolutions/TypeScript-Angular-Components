'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __date = services.date;

export let moduleName: string = 'rl.ui.filters.date';
export let filterName: string = 'rlDate';

export interface IDateFilter {
	(date?: moment.Moment, includeTime?: boolean): string;
}

dateFilter.$inject = [];
function dateFilter(): IDateFilter {
	'use strict';
	return (date?: moment.Moment, includeTime?: boolean): string => {
		let momentDate: moment.Moment = moment(date);
		if (includeTime) {
			return momentDate.format(__date.defaultFormats.dateTimeFormat) + momentDate.zoneAbbr();
		} else {
			return momentDate.format(__date.defaultFormats.dateFormat);
		}
	};
}

angular.module(moduleName, [])
	.filter(filterName, dateFilter);
