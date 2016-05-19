"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsb0JBS08sT0FBTyxDQUFDLENBQUE7QUFVZCx3QkFBZ0I7QUFDaEIsV0FBRztBQUNILHlCQUFpQjtBQUNqQixxQkFBYTtBQVpkLHVCQU1PLFVBQVUsQ0FBQyxDQUFBO0FBT2pCLDJCQUFtQjtBQUNuQixjQUFNO0FBQ04sNEJBQW9CO0FBQ3BCLHdCQUFnQjtBQUlOLGtCQUFVLEdBQVcsdUJBQXVCLENBQUM7QUFFeEQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLEVBQUUsQ0FBQztLQUM1QixTQUFTLENBQUMsbUJBQWdCLEVBQUUsU0FBRyxDQUFDO0tBQ2hDLFVBQVUsQ0FBQyxvQkFBaUIsRUFBRSxtQkFBYSxDQUFDO0tBQzVDLFNBQVMsQ0FBQyxzQkFBbUIsRUFBRSxlQUFNLENBQUM7S0FDdEMsVUFBVSxDQUFDLHVCQUFvQixFQUFFLHlCQUFnQixDQUFDLENBQUMifQ==