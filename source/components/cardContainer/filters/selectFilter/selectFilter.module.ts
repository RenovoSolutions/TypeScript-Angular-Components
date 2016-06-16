import * as angular from 'angular';

import {componentName, selectFilter, controllerName, SelectFilterController }from './selectFilter.component'

export const moduleName: string = 'rl.ui.components.cardContainer.filters.selectFilter';
export * from  './selectFilter.service';
export * from './selectFilter.component'

angular.module(moduleName, [])
	.component(componentName, selectFilter)
	.controller(controllerName, SelectFilterController);
