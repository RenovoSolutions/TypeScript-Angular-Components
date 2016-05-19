"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ydHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxJQUFZLFNBQVMsV0FBTSwrQkFBK0IsQ0FBQyxDQUFBO0FBTzFELGlCQUFTO0FBTlYsSUFBWSxNQUFNLFdBQU0seUJBQXlCLENBQUMsQ0FBQTtBQU9qRCxjQUFNO0FBTFAsaUJBQWMsUUFBUSxDQUFDLEVBQUE7QUFDdkIsaUJBQWMsaUJBQWlCLENBQUMsRUFBQTtBQU9yQixrQkFBVSxHQUFXLHNDQUFzQyxDQUFDO0FBRXZFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQixTQUFTLENBQUMsVUFBVTtJQUNwQixNQUFNLENBQUMsVUFBVTtDQUNqQixDQUFDLENBQUMifQ==