'use strict';
var angular = require('angular');
var tab_1 = require('./tab');
exports.tabDirectiveName = tab_1.directiveName;
exports.tab = tab_1.tab;
exports.tabControllerName = tab_1.controllerName;
exports.TabController = tab_1.TabController;
var tabset_1 = require('./tabset');
exports.tabsetDirectiveName = tabset_1.directiveName;
exports.tabset = tabset_1.tabset;
exports.tabsetControllerName = tabset_1.controllerName;
exports.TabsetController = tabset_1.TabsetController;
exports.moduleName = 'rl.ui.components.tabs';
angular.module(exports.moduleName, [])
    .directive(tab_1.directiveName, tab_1.tab)
    .controller(tab_1.controllerName, tab_1.TabController)
    .directive(tabset_1.directiveName, tabset_1.tabset)
    .controller(tabset_1.controllerName, tabset_1.TabsetController);
//# sourceMappingURL=tabs.module.js.map