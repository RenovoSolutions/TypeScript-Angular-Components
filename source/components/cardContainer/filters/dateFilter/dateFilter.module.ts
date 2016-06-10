import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import {dateFilterFactory, factoryName} from './dateFilter.service';
import {componentName, dateFilter, controllerName, DateFilterController }from './dateFilter.component';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.dateFilter';
export * from  './dateFilter.service';
export * from './dateFilter.component';

angular.module(moduleName, [downgrade.moduleName])
	.factory(factoryName, dateFilterFactory)
	.component(componentName, dateFilter)
	.controller(controllerName, DateFilterController);