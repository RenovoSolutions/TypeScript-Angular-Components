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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydHMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic29ydHMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLElBQVksU0FBUyxXQUFNLCtCQUErQixDQUFDLENBQUE7QUFPMUQsaUJBQVM7QUFOVixJQUFZLE1BQU0sV0FBTSx5QkFBeUIsQ0FBQyxDQUFBO0FBT2pELGNBQU07QUFMUCxpQkFBYyxRQUFRLENBQUMsRUFBQTtBQUN2QixpQkFBYyxpQkFBaUIsQ0FBQyxFQUFBO0FBT3JCLGtCQUFVLEdBQVcsc0NBQXNDLENBQUM7QUFFdkUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLFNBQVMsQ0FBQyxVQUFVO0lBQ3BCLE1BQU0sQ0FBQyxVQUFVO0NBQ2pCLENBQUMsQ0FBQyJ9