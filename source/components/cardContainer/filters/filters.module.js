'use strict';
var angular = require('angular');
var columnSearchFilter = require('./columnSearchFilter/columnSearchFilter.service');
exports.columnSearchFilter = columnSearchFilter;
var dateFilter = require('./dateFilter/dateFilter.module');
var filterGroup = require('./filterGroup/filterGroup.module');
exports.filterGroup = filterGroup;
var selectFilter = require('./selectFilter/selectFilter.module');
exports.selectFilter = selectFilter;
exports.moduleName = 'rl.ui.components.cardContainer.filters';
angular.module(exports.moduleName, [
    columnSearchFilter.moduleName,
    dateFilter.moduleName,
    filterGroup.moduleName,
    selectFilter.moduleName
]);
//# sourceMappingURL=filters.module.js.map