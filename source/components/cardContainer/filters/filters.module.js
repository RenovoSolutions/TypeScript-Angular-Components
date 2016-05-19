"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBWSxrQkFBa0IsV0FBTSxpREFBaUQsQ0FBQyxDQUFBO0FBUzdFLDBCQUFrQjtBQVIzQixJQUFZLFVBQVUsV0FBTSxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdELElBQVksV0FBVyxXQUFNLGtDQUFrQyxDQUFDLENBQUE7QUFPbkMsbUJBQVc7QUFOeEMsSUFBWSxZQUFZLFdBQU0sb0NBQW9DLENBQUMsQ0FBQTtBQU16QixvQkFBWTtBQUp0RCxJQUFZLG9CQUFvQixXQUFNLHdCQUF3QixDQUFDLENBQUE7QUFFL0QsaUJBQWMsd0JBQXdCLENBQUMsRUFBQTtBQUk1QixrQkFBVSxHQUFXLHdDQUF3QyxDQUFDO0FBRXpFLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRTtJQUMxQixrQkFBa0IsQ0FBQyxVQUFVO0lBQzdCLFVBQVUsQ0FBQyxVQUFVO0lBQ3JCLFdBQVcsQ0FBQyxVQUFVO0lBQ3RCLFlBQVksQ0FBQyxVQUFVO0lBRXZCLG9CQUFvQixDQUFDLFVBQVU7Q0FDL0IsQ0FBQyxDQUFDIn0=