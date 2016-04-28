'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var dateFilter_service_1 = require('./dateFilter.service');
var dateFilter_component_1 = require('./dateFilter.component');
exports.moduleName = 'rl.ui.components.cardContainer.filters.dateFilter';
__export(require('./dateFilter.service'));
__export(require('./dateFilter.component'));
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(dateFilter_service_1.factoryName, dateFilter_service_1.dateFilterFactory)
    .component(dateFilter_component_1.componentName, dateFilter_component_1.dateFilter)
    .controller(dateFilter_component_1.controllerName, dateFilter_component_1.DateFilterController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUVuRSxtQ0FBNkMsc0JBQXNCLENBQUMsQ0FBQTtBQUNwRSxxQ0FBOEUsd0JBQXdCLENBQUMsQ0FBQTtBQUU1RixrQkFBVSxHQUFXLG1EQUFtRCxDQUFDO0FBQ3BGLGlCQUFlLHNCQUFzQixDQUFDLEVBQUE7QUFDdEMsaUJBQWMsd0JBQXdCLENBQUMsRUFBQTtBQUV2QyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx3Q0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ2hELE9BQU8sQ0FBQyxnQ0FBVyxFQUFFLHNDQUFpQixDQUFDO0tBQ3ZDLFNBQVMsQ0FBQyxvQ0FBYSxFQUFFLGlDQUFVLENBQUM7S0FDcEMsVUFBVSxDQUFDLHFDQUFjLEVBQUUsMkNBQW9CLENBQUMsQ0FBQyJ9