'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var dataSourceBase_service_1 = require('./dataSourceBase.service');
var events = require('./dataSourceEvents');
var AsyncDataSource = (function (_super) {
    __extends(AsyncDataSource, _super);
    function AsyncDataSource(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.observable.allowableEvents = events.async.all;
        this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
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
        this.observable.fire(events.async.reloaded);
        this.observable.fire(events.redrawing);
        this.observable.fire(events.changed);
    };
    // override with params for getDataSet
    AsyncDataSource.prototype.getParams = function () {
        return null;
    };
    return AsyncDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.AsyncDataSource = AsyncDataSource;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmNEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhc3luY0RhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQVViLHVDQUErQiwwQkFBMEIsQ0FBQyxDQUFBO0FBRTFELElBQVksTUFBTSxXQUFNLG9CQUFvQixDQUFDLENBQUE7QUFXN0M7SUFBZ0QsbUNBQXlCO0lBR3hFLHlCQUFZLFVBQXVDLEVBQy9DLGlCQUF5RCxFQUN6RCxtQkFBeUMsRUFDekMsS0FBNEIsRUFDNUIsMkJBQWdGO1FBQ25GLGtCQUFNLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ25ELElBQUksQ0FBQyxvQkFBb0IsR0FBRywyQkFBMkIsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEgsQ0FBQztJQUVELHNCQUFJLHVDQUFVO2FBQWQsVUFBZSxLQUFrQztZQUNoRCxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUNoRCxDQUFDOzs7T0FBQTtJQUVELGdDQUFNLEdBQU47UUFDQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztRQUUzQixJQUFJLENBQUMsb0JBQW9CLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFFUyx1Q0FBYSxHQUF2QixVQUF3QixJQUFpQjtRQUN4QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztRQUM1QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUV2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxzQ0FBc0M7SUFDNUIsbUNBQVMsR0FBbkI7UUFDQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2IsQ0FBQztJQUNGLHNCQUFDO0FBQUQsQ0FBQyxBQXZDRCxDQUFnRCx1Q0FBYyxHQXVDN0Q7QUF2Q1ksdUJBQWUsa0JBdUMzQixDQUFBIn0=