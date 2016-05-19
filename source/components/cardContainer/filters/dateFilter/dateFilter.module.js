"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0ZUZpbHRlci5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRlRmlsdGVyLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFFbkUsbUNBQTZDLHNCQUFzQixDQUFDLENBQUE7QUFDcEUscUNBQThFLHdCQUF3QixDQUFDLENBQUE7QUFFNUYsa0JBQVUsR0FBVyxtREFBbUQsQ0FBQztBQUNwRixpQkFBZSxzQkFBc0IsQ0FBQyxFQUFBO0FBQ3RDLGlCQUFjLHdCQUF3QixDQUFDLEVBQUE7QUFFdkMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxPQUFPLENBQUMsZ0NBQVcsRUFBRSxzQ0FBaUIsQ0FBQztLQUN2QyxTQUFTLENBQUMsb0NBQWEsRUFBRSxpQ0FBVSxDQUFDO0tBQ3BDLFVBQVUsQ0FBQyxxQ0FBYyxFQUFFLDJDQUFvQixDQUFDLENBQUMifQ==