'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
            var valueOfA = sort.column.getValue(a);
            var valueOfB = sort.column.getValue(b);
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
})();
exports.Sorter = Sorter;
angular.module(exports.moduleName, [])
    .service(exports.serviceName, Sorter);
//# sourceMappingURL=sorter.service.js.map