"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0RmlsdGVyLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlbGVjdEZpbHRlci5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLHFDQUErQyx3QkFBd0IsQ0FBQyxDQUFBO0FBQ3hFLHVDQUFrRiwwQkFFbEYsQ0FBQyxDQUYyRztBQUVqRyxrQkFBVSxHQUFXLHFEQUFxRCxDQUFDO0FBQ3RGLGlCQUFlLHdCQUF3QixDQUFDLEVBQUE7QUFDeEMsaUJBQWMsMEJBRWQsQ0FBQyxFQUZ1QztBQUV4QyxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFFMUIsQ0FBQztLQUNBLE9BQU8sQ0FBQyxrQ0FBVyxFQUFFLDBDQUFtQixDQUFDO0tBQ3pDLFNBQVMsQ0FBQyxzQ0FBYSxFQUFFLHFDQUFZLENBQUM7S0FDdEMsVUFBVSxDQUFDLHVDQUFjLEVBQUUsK0NBQXNCLENBQUMsQ0FBQyJ9