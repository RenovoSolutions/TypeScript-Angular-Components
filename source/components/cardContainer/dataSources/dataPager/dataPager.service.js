// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var Rx = require('rx');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataPager';
exports.factoryName = 'dataPager';
exports.defaultPageSize = 10;
var DataPager = (function () {
    function DataPager() {
        this._pageNumber = 1;
        this._pageSize = exports.defaultPageSize;
        this.pageNumberObservable = new Rx.Subject();
        this.pageSizeObservable = new Rx.Subject();
    }
    Object.defineProperty(DataPager.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (value) {
            this._pageNumber = value;
            this.pageNumberObservable.onNext(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPager.prototype, "pageSize", {
        get: function () {
            return this._pageSize;
        },
        set: function (value) {
            this._pageSize = value;
            this.pageSizeObservable.onNext(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataPager.prototype, "startItem", {
        get: function () {
            return (this.pageNumber - 1) * this.pageSize;
        },
        enumerable: true,
        configurable: true
    });
    DataPager.prototype.filter = function (dataSet) {
        return _(dataSet)
            .drop(this.startItem)
            .take(this.pageSize)
            .value();
    };
    return DataPager;
}());
exports.DataPager = DataPager;
function dataPagerFactory() {
    'use strict';
    return {
        getInstance: function () {
            return new DataPager();
        },
    };
}
exports.dataPagerFactory = dataPagerFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, dataPagerFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVBhZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhUGFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0RUFBNEU7QUFFNUUsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFFZCxrQkFBVSxHQUFXLHNEQUFzRCxDQUFDO0FBQzVFLG1CQUFXLEdBQVcsV0FBVyxDQUFDO0FBRWxDLHVCQUFlLEdBQVcsRUFBRSxDQUFDO0FBYXhDO0lBT0M7UUFOUSxnQkFBVyxHQUFXLENBQUMsQ0FBQztRQUN4QixjQUFTLEdBQVcsdUJBQWUsQ0FBQztRQU0zQyxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFVLENBQUM7UUFDckQsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBVSxDQUFDO0lBQ3BELENBQUM7SUFFRCxzQkFBSSxpQ0FBVTthQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWUsS0FBYTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUksK0JBQVE7YUFBWjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFhLEtBQWE7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLGdDQUFTO2FBQWI7WUFDQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCwwQkFBTSxHQUFOLFVBQU8sT0FBYztRQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ25CLEtBQUssRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSxpQkFBUyxZQXdDckIsQ0FBQTtBQU1EO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVBlLHdCQUFnQixtQkFPL0IsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyJ9