'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var selectFilter_service_1 = require('./selectFilter.service');
var selectFilter_component_1 = require('./selectFilter.component');
exports.moduleName = 'rl.ui.components.cardContainer.filters.selectFilter';
__export(require('./selectFilter.service'));
__export(require('./selectFilter.component'));
angular.module(exports.moduleName, [])
    .factory(selectFilter_service_1.factoryName, selectFilter_service_1.selectFilterFactory)
    .component(selectFilter_component_1.componentName, selectFilter_component_1.selectFilter)
    .controller(selectFilter_component_1.controllerName, selectFilter_component_1.SelectFilterController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdEZpbHRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMscUNBQStDLHdCQUF3QixDQUFDLENBQUE7QUFDeEUsdUNBQWtGLDBCQUVsRixDQUFDLENBRjJHO0FBRWpHLGtCQUFVLEdBQVcscURBQXFELENBQUM7QUFDdEYsaUJBQWUsd0JBQXdCLENBQUMsRUFBQTtBQUN4QyxpQkFBYywwQkFFZCxDQUFDLEVBRnVDO0FBRXhDLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUUxQixDQUFDO0tBQ0EsT0FBTyxDQUFDLGtDQUFXLEVBQUUsMENBQW1CLENBQUM7S0FDekMsU0FBUyxDQUFDLHNDQUFhLEVBQUUscUNBQVksQ0FBQztLQUN0QyxVQUFVLENBQUMsdUNBQWMsRUFBRSwrQ0FBc0IsQ0FBQyxDQUFDIn0=