import * as angular from 'angular';

import * as date from './date/date.filter';

export { date };

export let moduleName: string = 'rl.ui.filters';

angular.module(moduleName, [
	date.moduleName,
]);
