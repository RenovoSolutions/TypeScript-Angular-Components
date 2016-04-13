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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0YWJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxvQkFLTyxPQUFPLENBQUMsQ0FBQTtBQVVkLHdCQUFnQjtBQUNoQixXQUFHO0FBQ0gseUJBQWlCO0FBQ2pCLHFCQUFhO0FBWmQsdUJBTU8sVUFBVSxDQUFDLENBQUE7QUFPakIsMkJBQW1CO0FBQ25CLGNBQU07QUFDTiw0QkFBb0I7QUFDcEIsd0JBQWdCO0FBSU4sa0JBQVUsR0FBVyx1QkFBdUIsQ0FBQztBQUV4RCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLFNBQVMsQ0FBQyxtQkFBZ0IsRUFBRSxTQUFHLENBQUM7S0FDaEMsVUFBVSxDQUFDLG9CQUFpQixFQUFFLG1CQUFhLENBQUM7S0FDNUMsU0FBUyxDQUFDLHNCQUFtQixFQUFFLGVBQU0sQ0FBQztLQUN0QyxVQUFVLENBQUMsdUJBQW9CLEVBQUUseUJBQWdCLENBQUMsQ0FBQyJ9