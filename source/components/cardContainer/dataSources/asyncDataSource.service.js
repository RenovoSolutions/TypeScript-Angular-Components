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
//# sourceMappingURL=asyncDataSource.service.js.map