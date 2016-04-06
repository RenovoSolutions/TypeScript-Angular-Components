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
//# sourceMappingURL=dateFilter.module.js.map