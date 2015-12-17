'use strict';

import * as angular from 'angular';

import {selectFilterFactory, factoryName} from './selectFilter.service';
import {directiveName, selectFilter, controllerName, SelectFilterController }from './selectFilter.component'

export var moduleName: string = 'rl.ui.components.cardContainer.filters.selectFilter';
export * from  './selectFilter.service';
export * from './selectFilter.component'

angular.module(moduleName, [

])
	.factory(factoryName, selectFilterFactory)
	.directive(directiveName, selectFilter)
	.controller(controllerName, SelectFilterController);
