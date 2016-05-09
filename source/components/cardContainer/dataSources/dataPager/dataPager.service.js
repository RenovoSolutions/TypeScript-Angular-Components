// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var Rx = require('rxjs');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataPager';
exports.factoryName = 'dataPager';
exports.defaultPageSize = 10;
var DataPager = (function () {
    function DataPager() {
        this._pageNumber = 1;
        this._pageSize = exports.defaultPageSize;
        this.pageNumberChanges = new Rx.Subject();
        this.pageSizeChanges = new Rx.Subject();
    }
    Object.defineProperty(DataPager.prototype, "pageNumber", {
        get: function () {
            return this._pageNumber;
        },
        set: function (value) {
            this._pageNumber = value;
            this.pageNumberChanges.next(value);
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
            this.pageSizeChanges.next(value);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVBhZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhUGFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0RUFBNEU7QUFFNUUsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFDNUIsSUFBWSxFQUFFLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFFaEIsa0JBQVUsR0FBVyxzREFBc0QsQ0FBQztBQUM1RSxtQkFBVyxHQUFXLFdBQVcsQ0FBQztBQUVsQyx1QkFBZSxHQUFXLEVBQUUsQ0FBQztBQWF4QztJQU9DO1FBTlEsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsY0FBUyxHQUFXLHVCQUFlLENBQUM7UUFNM0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBVSxDQUFDO1FBQ2xELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFVLENBQUM7SUFDakQsQ0FBQztJQUVELHNCQUFJLGlDQUFVO2FBQWQ7WUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUN6QixDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQzNCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQzs7O09BTEE7SUFPRCxzQkFBSSwrQkFBUTthQUFaO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDdkIsQ0FBQzthQUVELFVBQWEsS0FBYTtZQUN6QixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztZQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQyxDQUFDOzs7T0FMQTtJQU9ELHNCQUFJLGdDQUFTO2FBQWI7WUFDQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDOUMsQ0FBQzs7O09BQUE7SUFFRCwwQkFBTSxHQUFOLFVBQU8sT0FBYztRQUNwQixNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQzthQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO2FBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2FBQ25CLEtBQUssRUFBRSxDQUFDO0lBQ1gsQ0FBQztJQUNGLGdCQUFDO0FBQUQsQ0FBQyxBQXhDRCxJQXdDQztBQXhDWSxpQkFBUyxZQXdDckIsQ0FBQTtBQU1EO0lBQ0MsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVztZQUNWLE1BQU0sQ0FBQyxJQUFJLFNBQVMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVBlLHdCQUFnQixtQkFPL0IsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxFQUFFLENBQUM7S0FDNUIsT0FBTyxDQUFDLG1CQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyJ9