import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { componentName, dateFilter, controllerName, DateFilterController }from './dateFilter.component';

export const moduleName: string = 'rl.ui.components.cardContainer.filters.dateFilter';
export * from  './dateFilter.service';
export * from './dateFilter.component';

angular.module(moduleName, [downgrade.moduleName])
	.component(componentName, dateFilter)
	.controller(controllerName, DateFilterController);