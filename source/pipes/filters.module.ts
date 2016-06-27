import * as angular from 'angular';

import * as date from './date/date.pipe';
import * as localizeStringDates from './localizeStringDates/localizeStringDates.filter';
export { date, localizeStringDates };

export let moduleName: string = 'rl.ui.filters';

angular.module(moduleName, [
	localizeStringDates.moduleName
]);
