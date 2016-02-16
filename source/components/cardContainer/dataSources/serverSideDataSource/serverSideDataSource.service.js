'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
var __array = typescript_angular_utilities_1.services.array;
var __object = typescript_angular_utilities_1.services.object;
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
var events = require('../dataSourceEvents');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
exports.factoryName = 'serverSideDataSource';
var ServerSideDataSource = (function (_super) {
    __extends(ServerSideDataSource, _super);
    function ServerSideDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        var _this = this;
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.object = object;
        this.resolveReload = function (data) {
            _this.loadingDataSet = false;
            _this.rawDataSet = data;
            _this.refresh();
            _this.observable.fire(events.async.reloaded);
            _this.observable.fire(events.changed);
        };
        this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
    }
    Object.defineProperty(ServerSideDataSource.prototype, "getDataSet", {
        set: function (value) {
            this.synchronizedRequests.dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    ServerSideDataSource.prototype.refresh = function () {
        // if filters changed, reload
        // if () {
        // this.reload();
        // } else {
        _super.prototype.refresh.call(this);
        // }
    };
    ServerSideDataSource.prototype.reload = function () {
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.synchronizedRequests.getData();
    };
    return ServerSideDataSource;
})(dataSourceBase_service_1.DataSourceBase);
exports.ServerSideDataSource = ServerSideDataSource;
serverSideDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function serverSideDataSourceFactory(observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new ServerSideDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.serverSideDataSourceFactory = serverSideDataSourceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, serverSideDataSourceFactory);
//# sourceMappingURL=serverSideDataSource.service.js.map