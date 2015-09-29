'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var mergeSort = require('./mergeSort/mergeSort.service');
exports.mergeSort = mergeSort;
var sorter = require('./sorter/sorter.service');
exports.sorter = sorter;
__export(require('./sort'));
__export(require('./sortDirection'));
exports.moduleName = 'rl.ui.components.cardContainer.sorts';
angular.module(exports.moduleName, [
    mergeSort.moduleName,
    sorter.moduleName,
]);
//# sourceMappingURL=sorts.module.js.map