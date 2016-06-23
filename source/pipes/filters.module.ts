import * as angular from 'angular';

import * as date from './date/date.pipe';
import * as localizeStringDates from './localizeStringDates/localizeStringDates.filter';
import * as time from './time/time.pipe';
export { date, localizeStringDates, time };

export let moduleName: string = 'rl.ui.filters';

angular.module(moduleName, [
	localizeStringDates.moduleName
]);
