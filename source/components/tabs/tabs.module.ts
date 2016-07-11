import * as angular from 'angular';

import {
	componentName as tabComponentName,
	tab,
	controllerName as tabControllerName,
	TabController,
} from './tab.ng1';
import {
	componentName as tabsetComponentName,
	tabset,
	controllerName as tabsetControllerName,
	TabsetController,
	ITabHeader,
} from './tabset.ng1';


export {
	tabComponentName,
	tab,
	tabControllerName,
	TabController,
	tabsetComponentName,
	tabset,
	tabsetControllerName,
	TabsetController,
	ITabHeader,
}

export let moduleName: string = 'rl.ui.components.tabs';

angular.module(moduleName, [])
	.component(tabComponentName, tab)
	.controller(tabControllerName, TabController)
	.component(tabsetComponentName, tabset)
	.controller(tabsetControllerName, TabsetController);
