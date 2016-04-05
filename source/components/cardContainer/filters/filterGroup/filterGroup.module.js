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
//# sourceMappingURL=filterGroup.module.js.map