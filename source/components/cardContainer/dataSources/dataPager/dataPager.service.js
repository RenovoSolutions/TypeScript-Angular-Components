// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataPager';
exports.factoryName = 'dataPager';
exports.defaultPageSize = 10;
var DataPager = (function () {
    function DataPager() {
        this.pageNumber = 1;
        this.pageSize = exports.defaultPageSize;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVBhZ2VyLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhUGFnZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw0RUFBNEU7QUFFNUUsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFakIsa0JBQVUsR0FBVyxzREFBc0QsQ0FBQztBQUM1RSxtQkFBVyxHQUFXLFdBQVcsQ0FBQztBQUVsQyx1QkFBZSxHQUFXLEVBQUUsQ0FBQztBQVN4QztJQUFBO1FBQ0MsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixhQUFRLEdBQVcsdUJBQWUsQ0FBQztJQVlwQyxDQUFDO0lBVkEsc0JBQUksZ0NBQVM7YUFBYjtZQUNDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUM5QyxDQUFDOzs7T0FBQTtJQUVELDBCQUFNLEdBQU4sVUFBTyxPQUFjO1FBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO2FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7YUFDbkIsS0FBSyxFQUFFLENBQUM7SUFDWCxDQUFDO0lBQ0YsZ0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWRZLGlCQUFTLFlBY3JCLENBQUE7QUFNRDtJQUNDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVc7WUFDVixNQUFNLENBQUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztRQUN4QixDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFQZSx3QkFBZ0IsbUJBTy9CLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLGdCQUFnQixDQUFDLENBQUMifQ==