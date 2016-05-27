import * as angular from 'angular';

import * as date from './date/date.filter';
import * as localizeStringDates from './localizeStringDates/localizeStringDates.filter';
export { date };
export { localizeStringDates};

export let moduleName: string = 'rl.ui.filters';

angular.module(moduleName, [
	localizeStringDates.moduleName
]);
