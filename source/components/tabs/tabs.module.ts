'use strict';

import * as angular from 'angular';

import {
	componentName as tabComponentName,
	tab,
	controllerName as tabControllerName,
	TabController,
} from './tab';
import {
	directiveName as tabsetDirectiveName,
	tabset,
	controllerName as tabsetControllerName,
	TabsetController,
	ITabHeader,
} from './tabset';

export {
	tabComponentName,
	tab,
	tabControllerName,
	TabController,
	tabsetDirectiveName,
	tabset,
	tabsetControllerName,
	TabsetController,
	ITabHeader,
}

export let moduleName: string = 'rl.ui.components.tabs';

angular.module(moduleName, [])
	.component(tabComponentName, tab)
	.controller(tabControllerName, TabController)
	.directive(tabsetDirectiveName, tabset)
	.controller(tabsetControllerName, TabsetController);
