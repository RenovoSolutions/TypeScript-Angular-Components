// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />
"use strict";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVBhZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhUGFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0RUFBNEU7O0FBRTVFLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksRUFBRSxXQUFNLE1BQU0sQ0FBQyxDQUFBO0FBRWhCLGtCQUFVLEdBQVcsc0RBQXNELENBQUM7QUFDNUUsbUJBQVcsR0FBVyxXQUFXLENBQUM7QUFFbEMsdUJBQWUsR0FBVyxFQUFFLENBQUM7QUFheEM7SUFPQztRQU5RLGdCQUFXLEdBQVcsQ0FBQyxDQUFDO1FBQ3hCLGNBQVMsR0FBVyx1QkFBZSxDQUFDO1FBTTNDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQVUsQ0FBQztRQUNsRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBVSxDQUFDO0lBQ2pELENBQUM7SUFFRCxzQkFBSSxpQ0FBVTthQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDekIsQ0FBQzthQUVELFVBQWUsS0FBYTtZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN6QixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7OztPQUxBO0lBT0Qsc0JBQUksK0JBQVE7YUFBWjtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1FBQ3ZCLENBQUM7YUFFRCxVQUFhLEtBQWE7WUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEMsQ0FBQzs7O09BTEE7SUFPRCxzQkFBSSxnQ0FBUzthQUFiO1lBQ0MsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQzlDLENBQUM7OztPQUFBO0lBRUQsMEJBQU0sR0FBTixVQUFPLE9BQWM7UUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7YUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQzthQUNwQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQzthQUNuQixLQUFLLEVBQUUsQ0FBQztJQUNYLENBQUM7SUFDRixnQkFBQztBQUFELENBQUMsQUF4Q0QsSUF3Q0M7QUF4Q1ksaUJBQVMsWUF3Q3JCLENBQUE7QUFNRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVc7WUFDVixNQUFNLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN4QixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFQZSx3QkFBZ0IsbUJBTy9CLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==