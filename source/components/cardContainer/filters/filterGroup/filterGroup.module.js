'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var filterOption = require('./filterOption/filterOption');
exports.filterOption = filterOption;
var modeFilterGroup = require('./modeFilterGroup/modeFilterGroup.service');
exports.modeFilterGroup = modeFilterGroup;
var rangeFilterGroup = require('./rangeFilterGroup/rangeFilterGroup.service');
exports.rangeFilterGroup = rangeFilterGroup;
var filterGroup_service_1 = require('./filterGroup.service');
var filterGroup_directive_1 = require('./filterGroup.directive');
__export(require('./filterGroup.directive'));
__export(require('./filterGroup.service'));
exports.moduleName = 'rl.ui.components.cardContainer.filters.filterGroup';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.services.object.moduleName,
    filterOption.moduleName,
    modeFilterGroup.moduleName,
    rangeFilterGroup.moduleName,
])
    .factory(filterGroup_service_1.factoryName, filterGroup_service_1.filterGroupFactory)
    .component(filterGroup_directive_1.componentName, filterGroup_directive_1.filterGroup)
    .controller(filterGroup_directive_1.controllerName, filterGroup_directive_1.FilterGroupController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyR3JvdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBRXhELElBQVksWUFBWSxXQUFNLDZCQUE2QixDQUFDLENBQUE7QUFLM0Qsb0JBQVk7QUFKYixJQUFZLGVBQWUsV0FBTSwyQ0FBMkMsQ0FBQyxDQUFBO0FBSzVFLHVCQUFlO0FBSmhCLElBQVksZ0JBQWdCLFdBQU0sNkNBQTZDLENBQUMsQ0FBQTtBQUsvRSx3QkFBZ0I7QUFHakIsb0NBQWdELHVCQUF1QixDQUFDLENBQUE7QUFDeEUsc0NBQWtGLHlCQUF5QixDQUFDLENBQUE7QUFFNUcsaUJBQWMseUJBQXlCLENBQUMsRUFBQTtBQUN4QyxpQkFBYyx1QkFBdUIsQ0FBQyxFQUFBO0FBRTNCLGtCQUFVLEdBQVcsb0RBQW9ELENBQUM7QUFFckYsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLHVDQUFRLENBQUMsTUFBTSxDQUFDLFVBQVU7SUFFMUIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsZUFBZSxDQUFDLFVBQVU7SUFDMUIsZ0JBQWdCLENBQUMsVUFBVTtDQUMzQixDQUFDO0tBQ0EsT0FBTyxDQUFDLGlDQUFXLEVBQUUsd0NBQWtCLENBQUM7S0FDeEMsU0FBUyxDQUFDLHFDQUFhLEVBQUUsbUNBQVcsQ0FBQztLQUNyQyxVQUFVLENBQUMsc0NBQWMsRUFBRSw2Q0FBcUIsQ0FBQyxDQUFDIn0=