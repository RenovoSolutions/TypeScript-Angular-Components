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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVycy5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWx0ZXJzLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUVuQyxJQUFZLGtCQUFrQixXQUFNLGlEQUFpRCxDQUFDLENBQUE7QUFTN0UsMEJBQWtCO0FBUjNCLElBQVksVUFBVSxXQUFNLGdDQUFnQyxDQUFDLENBQUE7QUFDN0QsSUFBWSxXQUFXLFdBQU0sa0NBQWtDLENBQUMsQ0FBQTtBQU9uQyxtQkFBVztBQU54QyxJQUFZLFlBQVksV0FBTSxvQ0FBb0MsQ0FBQyxDQUFBO0FBTXpCLG9CQUFZO0FBSnRELElBQVksb0JBQW9CLFdBQU0sd0JBQXdCLENBQUMsQ0FBQTtBQUUvRCxpQkFBYyx3QkFBd0IsQ0FBQyxFQUFBO0FBSTVCLGtCQUFVLEdBQVcsd0NBQXdDLENBQUM7QUFFekUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLGtCQUFrQixDQUFDLFVBQVU7SUFDN0IsVUFBVSxDQUFDLFVBQVU7SUFDckIsV0FBVyxDQUFDLFVBQVU7SUFDdEIsWUFBWSxDQUFDLFVBQVU7SUFFdkIsb0JBQW9CLENBQUMsVUFBVTtDQUMvQixDQUFDLENBQUMifQ==