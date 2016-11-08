import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { componentName, dateFilter, controllerName, DateFilterController }from './dateFilter.component.ng1';

export const moduleName: string = 'rl.ui.components.cardContainer.filters.dateFilter';
export * from  './dateFilterOld.service';
export * from './dateFilter.component.ng1';

angular.module(moduleName, [downgrade.moduleName])
	.component(componentName, dateFilter)
	.controller(controllerName, DateFilterController);
