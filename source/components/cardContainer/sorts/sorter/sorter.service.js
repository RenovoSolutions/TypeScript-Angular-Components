"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __transform = typescript_angular_utilities_1.services.transform.transform;
var sortDirection_1 = require('../sortDirection');
var mergeSort_service_1 = require('../mergeSort/mergeSort.service');
exports.moduleName = 'rl.ui.components.cardContainer.sorts.sorter';
exports.serviceName = 'sorter';
var Sorter = (function () {
    function Sorter(mergeSort) {
        this.mergeSort = mergeSort;
    }
    Sorter.prototype.sort = function (data, sort) {
        var _this = this;
        if (sort === null) {
            return data;
        }
        if (_.isArray(sort)) {
            var reverseSorts = _.clone(sort);
            reverseSorts.reverse();
            return _.reduce(reverseSorts, function (sortedData, nextSort) {
                return _this.singleSort(sortedData, nextSort);
            }, data);
        }
        return this.singleSort(data, sort);
    };
    Sorter.prototype.singleSort = function (data, sort) {
        var compareFunction = this.buildSortFunction(sort);
        return this.mergeSort.sort(data, compareFunction);
    };
    Sorter.prototype.buildSortFunction = function (sort) {
        return function (a, b) {
            if (sort.direction === sortDirection_1.SortDirection.none) {
                return typescript_angular_utilities_1.types.CompareResult.equal;
            }
            var valueOfA = __transform.getValue(a, sort.column.getValue);
            var valueOfB = __transform.getValue(b, sort.column.getValue);
            var greaterResult = typescript_angular_utilities_1.types.CompareResult.greater;
            var lessResult = typescript_angular_utilities_1.types.CompareResult.less;
            var descendingSort = (sort.direction === sortDirection_1.SortDirection.descending);
            var flip = sort.column.flipSort;
            // Exclusive OR... if flipping a descending sort, you get an ascending sort
            if ((descendingSort || flip) && !(descendingSort && flip)) {
                greaterResult = typescript_angular_utilities_1.types.CompareResult.less;
                lessResult = typescript_angular_utilities_1.types.CompareResult.greater;
            }
            return valueOfA > valueOfB
                ? greaterResult
                : (valueOfA < valueOfB ? lessResult : typescript_angular_utilities_1.types.CompareResult.equal);
        };
    };
    Sorter.$inject = [mergeSort_service_1.serviceName];
    return Sorter;
}());
exports.Sorter = Sorter;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, Sorter);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzb3J0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQWdDLDhCQUE4QixDQUFDLENBQUE7QUFDL0QsSUFBTyxXQUFXLEdBQUcsdUNBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0FBR2xELDhCQUE4QixrQkFBa0IsQ0FBQyxDQUFBO0FBQ2pELGtDQUFnRSxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRXRGLGtCQUFVLEdBQVcsNkNBQTZDLENBQUM7QUFDbkUsbUJBQVcsR0FBVyxRQUFRLENBQUM7QUFPMUM7SUFFQyxnQkFBb0IsU0FBcUI7UUFBckIsY0FBUyxHQUFULFNBQVMsQ0FBWTtJQUFJLENBQUM7SUFFOUMscUJBQUksR0FBSixVQUFnQixJQUFpQixFQUFFLElBQXFCO1FBQXhELGlCQWVDO1FBZEEsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDbkIsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNiLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLFlBQVksR0FBcUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUM7WUFFdkIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLFVBQUMsVUFBaUIsRUFBRSxRQUFlO2dCQUNoRSxNQUFNLENBQUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDOUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ1YsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBUyxJQUFJLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRU8sMkJBQVUsR0FBbEIsVUFBOEIsSUFBaUIsRUFBRSxJQUFXO1FBQzNELElBQUksZUFBZSxHQUFnQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDaEYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRU8sa0NBQWlCLEdBQXpCLFVBQXFDLElBQVc7UUFDL0MsTUFBTSxDQUFDLFVBQUMsQ0FBWSxFQUFFLENBQVk7WUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyw2QkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE1BQU0sQ0FBQyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDbEMsQ0FBQztZQUVELElBQUksUUFBUSxHQUFRLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDbEUsSUFBSSxRQUFRLEdBQVEsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUVsRSxJQUFJLGFBQWEsR0FBd0Isb0NBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQ3JFLElBQUksVUFBVSxHQUF3QixvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7WUFHL0QsSUFBSSxjQUFjLEdBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLDZCQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDNUUsSUFBSSxJQUFJLEdBQVksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFFekMsMkVBQTJFO1lBQzNFLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzRCxhQUFhLEdBQUcsb0NBQUssQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDO2dCQUN6QyxVQUFVLEdBQUcsb0NBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDO1lBQzFDLENBQUM7WUFFRCxNQUFNLENBQUMsUUFBUSxHQUFHLFFBQVE7a0JBQ3ZCLGFBQWE7a0JBQ2IsQ0FBQyxRQUFRLEdBQUcsUUFBUSxHQUFHLFVBQVUsR0FBRyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuRSxDQUFDLENBQUM7SUFDSCxDQUFDO0lBbkRNLGNBQU8sR0FBYSxDQUFDLCtCQUFvQixDQUFDLENBQUM7SUFvRG5ELGFBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBckRZLGNBQU0sU0FxRGxCLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDIn0=