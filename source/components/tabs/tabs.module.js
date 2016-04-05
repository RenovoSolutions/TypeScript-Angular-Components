'use strict';
var angular = require('angular');
var tab_1 = require('./tab');
exports.tabComponentName = tab_1.componentName;
exports.tab = tab_1.tab;
exports.tabControllerName = tab_1.controllerName;
exports.TabController = tab_1.TabController;
var tabset_1 = require('./tabset');
exports.tabsetComponentName = tabset_1.componentName;
exports.tabset = tabset_1.tabset;
exports.tabsetControllerName = tabset_1.controllerName;
exports.TabsetController = tabset_1.TabsetController;
exports.moduleName = 'rl.ui.components.tabs';
angular.module(exports.moduleName, [])
    .component(tab_1.componentName, tab_1.tab)
    .controller(tab_1.controllerName, tab_1.TabController)
    .component(tabset_1.componentName, tabset_1.tabset)
    .controller(tabset_1.controllerName, tabset_1.TabsetController);
//# sourceMappingURL=tabs.module.js.map