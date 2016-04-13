'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __date = typescript_angular_utilities_1.services.date;
var dateFilter_service_1 = require('./dateFilter.service');
var dateFilter_component_1 = require('./dateFilter.component');
exports.moduleName = 'rl.ui.components.cardContainer.filters.dateFilter';
__export(require('./dateFilter.service'));
__export(require('./dateFilter.component'));
angular.module(exports.moduleName, [__date.moduleName])
    .factory(dateFilter_service_1.factoryName, dateFilter_service_1.dateFilterFactory)
    .component(dateFilter_component_1.componentName, dateFilter_component_1.dateFilter)
    .controller(dateFilter_component_1.controllerName, dateFilter_component_1.DateFilterController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyw2Q0FBdUIsOEJBQThCLENBQUMsQ0FBQTtBQUN0RCxJQUFPLE1BQU0sR0FBRyx1Q0FBUSxDQUFDLElBQUksQ0FBQztBQUU5QixtQ0FBNkMsc0JBQXNCLENBQUMsQ0FBQTtBQUNwRSxxQ0FBOEUsd0JBQXdCLENBQUMsQ0FBQTtBQUU1RixrQkFBVSxHQUFXLG1EQUFtRCxDQUFDO0FBQ3BGLGlCQUFlLHNCQUFzQixDQUFDLEVBQUE7QUFDdEMsaUJBQWMsd0JBQXdCLENBQUMsRUFBQTtBQUV2QyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDN0MsT0FBTyxDQUFDLGdDQUFXLEVBQUUsc0NBQWlCLENBQUM7S0FDdkMsU0FBUyxDQUFDLG9DQUFhLEVBQUUsaUNBQVUsQ0FBQztLQUNwQyxVQUFVLENBQUMscUNBQWMsRUFBRSwyQ0FBb0IsQ0FBQyxDQUFDIn0=