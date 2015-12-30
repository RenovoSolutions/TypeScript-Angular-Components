'use strict';

import * as angular from 'angular';

import {filters} from 'typescript-angular-utilities';


import {dateFilterFactory, factoryName} from './dateFilter.service';
import {directiveName, dateFilter, controllerName, DateFilterController }from './dateFilter.component'

export var moduleName: string = 'rl.ui.components.cardContainer.filters.dateFilter';
export * from  './dateFilter.service';
export * from './dateFilter.component'

angular.module(moduleName, [])
	.factory(factoryName, dateFilterFactory)
	.directive(directiveName, dateFilter)
	.controller(controllerName, DateFilterController);