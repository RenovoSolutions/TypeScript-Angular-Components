"use strict";
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
    typescript_angular_utilities_1.downgrade.moduleName,
    filterOption.moduleName,
    modeFilterGroup.moduleName,
    rangeFilterGroup.moduleName,
])
    .factory(filterGroup_service_1.factoryName, filterGroup_service_1.filterGroupFactory)
    .component(filterGroup_directive_1.componentName, filterGroup_directive_1.filterGroup)
    .controller(filterGroup_directive_1.controllerName, filterGroup_directive_1.FilterGroupController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyR3JvdXAubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsdGVyR3JvdXAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyw2Q0FBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCxJQUFZLFlBQVksV0FBTSw2QkFBNkIsQ0FBQyxDQUFBO0FBSzNELG9CQUFZO0FBSmIsSUFBWSxlQUFlLFdBQU0sMkNBQTJDLENBQUMsQ0FBQTtBQUs1RSx1QkFBZTtBQUpoQixJQUFZLGdCQUFnQixXQUFNLDZDQUE2QyxDQUFDLENBQUE7QUFLL0Usd0JBQWdCO0FBR2pCLG9DQUFnRCx1QkFBdUIsQ0FBQyxDQUFBO0FBQ3hFLHNDQUFrRix5QkFBeUIsQ0FBQyxDQUFBO0FBRTVHLGlCQUFjLHlCQUF5QixDQUFDLEVBQUE7QUFDeEMsaUJBQWMsdUJBQXVCLENBQUMsRUFBQTtBQUUzQixrQkFBVSxHQUFXLG9EQUFvRCxDQUFDO0FBRXJGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQix3Q0FBUyxDQUFDLFVBQVU7SUFFcEIsWUFBWSxDQUFDLFVBQVU7SUFDdkIsZUFBZSxDQUFDLFVBQVU7SUFDMUIsZ0JBQWdCLENBQUMsVUFBVTtDQUMzQixDQUFDO0tBQ0EsT0FBTyxDQUFDLGlDQUFXLEVBQUUsd0NBQWtCLENBQUM7S0FDeEMsU0FBUyxDQUFDLHFDQUFhLEVBQUUsbUNBQVcsQ0FBQztLQUNyQyxVQUFVLENBQUMsc0NBQWMsRUFBRSw2Q0FBcUIsQ0FBQyxDQUFDIn0=