import * as angular from 'angular';

import {selectFilterFactory, factoryName} from './selectFilter.service';
import {componentName, selectFilter, controllerName, SelectFilterController }from './selectFilter.component'

export var moduleName: string = 'rl.ui.components.cardContainer.filters.selectFilter';
export * from  './selectFilter.service';
export * from './selectFilter.component'

angular.module(moduleName, [

])
	.factory(factoryName, selectFilterFactory)
	.component(componentName, selectFilter)
	.controller(controllerName, SelectFilterController);
