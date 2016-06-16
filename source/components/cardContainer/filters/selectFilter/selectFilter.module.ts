import * as angular from 'angular';

import {componentName, selectFilter, controllerName, SelectFilterController }from './selectFilter.component.ng1';

export const moduleName: string = 'rl.ui.components.cardContainer.filters.selectFilter';
export * from  './selectFilter.service';
export * from './selectFilter.component.ng1';

angular.module(moduleName, [])
	.component(componentName, selectFilter)
	.controller(controllerName, SelectFilterController);
