'use strict';

import * as angular from 'angular';

import {
	directiveName as tabDirectiveName,
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
	tabDirectiveName,
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
	.directive(tabDirectiveName, tab)
	.controller(tabControllerName, TabController)
	.directive(tabsetDirectiveName, tabset)
	.controller(tabsetControllerName, TabsetController);
