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
//# sourceMappingURL=selectFilter.module.js.map