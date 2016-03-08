'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var columnSearchFilter = require('./columnSearchFilter/columnSearchFilter.service');
exports.columnSearchFilter = columnSearchFilter;
var dateFilter = require('./dateFilter/dateFilter.module');
var filterGroup = require('./filterGroup/filterGroup.module');
exports.filterGroup = filterGroup;
var selectFilter = require('./selectFilter/selectFilter.module');
exports.selectFilter = selectFilter;
var cardContainerFilters = require('./cardContainerFilters');
__export(require('./cardContainerFilters'));
exports.moduleName = 'rl.ui.components.cardContainer.filters';
angular.module(exports.moduleName, [
    columnSearchFilter.moduleName,
    dateFilter.moduleName,
    filterGroup.moduleName,
    selectFilter.moduleName,
    cardContainerFilters.moduleName
]);
//# sourceMappingURL=filters.module.js.map