"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var rxjs_1 = require('rxjs');
var dataSourceBase_service_1 = require('./dataSourceBase.service');
var AsyncDataSource = (function (_super) {
    __extends(AsyncDataSource, _super);
    function AsyncDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, dataSourceProcessor, array);
        this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
        this.reloaded = new rxjs_1.Subject();
    }
    Object.defineProperty(AsyncDataSource.prototype, "getDataSet", {
        set: function (value) {
            this.synchronizedRequests.dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    AsyncDataSource.prototype.reload = function () {
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.synchronizedRequests.getData(this.getParams());
    };
    AsyncDataSource.prototype.resolveReload = function (data) {
        this.loadingDataSet = false;
        this.rawDataSet = data;
        this.processData();
        this.reloaded.next(null);
        this.redrawing.next(null);
        this.changed.next(null);
    };
    // override with params for getDataSet
    AsyncDataSource.prototype.getParams = function () {
        return null;
    };
    return AsyncDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.AsyncDataSource = AsyncDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhc3luY0RhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSxxQkFBd0IsTUFBTSxDQUFDLENBQUE7QUFPL0IsdUNBQStCLDBCQUEwQixDQUFDLENBQUE7QUFhMUQ7SUFBZ0QsbUNBQXlCO0lBSXhFLHlCQUFZLFVBQXVDLEVBQy9DLG1CQUF5QyxFQUN6QyxLQUE0QixFQUM1QiwyQkFBZ0Y7UUFDbkYsa0JBQU0sbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLG9CQUFvQixHQUFHLDJCQUEyQixDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksY0FBTyxFQUFRLENBQUM7SUFDckMsQ0FBQztJQUVELHNCQUFJLHVDQUFVO2FBQWQsVUFBZSxLQUFrQztZQUNoRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUVELGdDQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFUyx1Q0FBYSxHQUF2QixVQUF3QixJQUFpQjtRQUN4QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekIsQ0FBQztJQUVELHNDQUFzQztJQUM1QixtQ0FBUyxHQUFuQjtRQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDYixDQUFDO0lBQ0Ysc0JBQUM7QUFBRCxDQUFDLEFBdkNELENBQWdELHVDQUFjLEdBdUM3RDtBQXZDWSx1QkFBZSxrQkF1QzNCLENBQUEifQ==