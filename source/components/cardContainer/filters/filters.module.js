'use strict';
var angular = require('angular');
var columnSearchFilter = require('./columnSearchFilter/columnSearchFilter.service');
exports.columnSearchFilter = columnSearchFilter;
var filterGroup = require('./filterGroup/filterGroup.module');
exports.filterGroup = filterGroup;
exports.moduleName = 'rl.ui.components.cardContainer.filters';
angular.module(exports.moduleName, [
    columnSearchFilter.moduleName,
    filterGroup.moduleName,
]);
//# sourceMappingURL=filters.module.js.map