'use strict';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic29ydGVyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzb3J0ZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBZ0MsOEJBQThCLENBQUMsQ0FBQTtBQUMvRCxJQUFPLFdBQVcsR0FBRyx1Q0FBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7QUFHbEQsOEJBQThCLGtCQUFrQixDQUFDLENBQUE7QUFDakQsa0NBQWdFLGdDQUFnQyxDQUFDLENBQUE7QUFFdEYsa0JBQVUsR0FBVyw2Q0FBNkMsQ0FBQztBQUNuRSxtQkFBVyxHQUFXLFFBQVEsQ0FBQztBQU8xQztJQUVDLGdCQUFvQixTQUFxQjtRQUFyQixjQUFTLEdBQVQsU0FBUyxDQUFZO0lBQUksQ0FBQztJQUU5QyxxQkFBSSxHQUFKLFVBQWdCLElBQWlCLEVBQUUsSUFBcUI7UUFBeEQsaUJBZUM7UUFkQSxFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNuQixNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ2IsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksWUFBWSxHQUFxQixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUV2QixNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLEVBQUUsVUFBQyxVQUFpQixFQUFFLFFBQWU7Z0JBQ2hFLE1BQU0sQ0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM5QyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDVixDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFTLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTywyQkFBVSxHQUFsQixVQUE4QixJQUFpQixFQUFFLElBQVc7UUFDM0QsSUFBSSxlQUFlLEdBQWdDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTyxrQ0FBaUIsR0FBekIsVUFBcUMsSUFBVztRQUMvQyxNQUFNLENBQUMsVUFBQyxDQUFZLEVBQUUsQ0FBWTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxLQUFLLDZCQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxDQUFDLG9DQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUNsQyxDQUFDO1lBRUQsSUFBSSxRQUFRLEdBQVEsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNsRSxJQUFJLFFBQVEsR0FBUSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRWxFLElBQUksYUFBYSxHQUF3QixvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDckUsSUFBSSxVQUFVLEdBQXdCLG9DQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQztZQUcvRCxJQUFJLGNBQWMsR0FBWSxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssNkJBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM1RSxJQUFJLElBQUksR0FBWSxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUV6QywyRUFBMkU7WUFDM0UsRUFBRSxDQUFDLENBQUMsQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNELGFBQWEsR0FBRyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUM7Z0JBQ3pDLFVBQVUsR0FBRyxvQ0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7WUFDMUMsQ0FBQztZQUVELE1BQU0sQ0FBQyxRQUFRLEdBQUcsUUFBUTtrQkFDdkIsYUFBYTtrQkFDYixDQUFDLFFBQVEsR0FBRyxRQUFRLEdBQUcsVUFBVSxHQUFHLG9DQUFLLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25FLENBQUMsQ0FBQztJQUNILENBQUM7SUFuRE0sY0FBTyxHQUFhLENBQUMsK0JBQW9CLENBQUMsQ0FBQztJQW9EbkQsYUFBQztBQUFELENBQUMsQUFyREQsSUFxREM7QUFyRFksY0FBTSxTQXFEbEIsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsTUFBTSxDQUFDLENBQUMifQ==