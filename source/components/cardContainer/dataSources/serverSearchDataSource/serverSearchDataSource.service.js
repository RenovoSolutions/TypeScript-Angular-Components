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
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSearchDataSource';
exports.factoryName = 'serverSearchDataSource';
var ServerSearchDataSource = (function (_super) {
    __extends(ServerSearchDataSource, _super);
    function ServerSearchDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        var _this = this;
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.searchFilter = searchFilter;
        this.getFilterModel = getFilterModel;
        this.validateModel = validateModel;
        this.object = object;
        this.minSearchLength = 4;
        this.resolveReload = function (data) {
            _this.loadingDataSet = false;
            _this.rawDataSet = data;
            _this.refresh();
            _this.observable.fire(events.async.reloaded);
            _this.observable.fire(events.changed);
        };
        this.getFilterModel = this.getFilterModel || function () { return null; };
        this.validateModel = this.validateModel || function () { return true; };
        this.countFilterGroups = true;
        this.search = searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        searchFilter.minSearchLength = this.minSearchLength;
        this.synchronizedRequests = synchronizedRequestsFactory.getInstance(getDataSet, this.resolveReload.bind(this));
    }
    Object.defineProperty(ServerSearchDataSource.prototype, "getDataSet", {
        set: function (value) {
            this.synchronizedRequests.dataProvider = value;
        },
        enumerable: true,
        configurable: true
    });
    ServerSearchDataSource.prototype.refresh = function () {
        if (this.searchFilter.searchText !== this.search
            || this.filterModelChanged()) {
            this.reload();
        }
        else {
            _super.prototype.refresh.call(this);
        }
    };
    ServerSearchDataSource.prototype.reload = function () {
        this.search = this.searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        var hasValidSearch = !this.object.isNullOrEmpty(this.search) && this.search.length >= this.minSearchLength;
        var hasValidFilterModel = this.filterModel != null && this.validateModel(this.filterModel);
        if (!hasValidSearch && !hasValidFilterModel) {
            this.resolveReload(null);
            return;
        }
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.synchronizedRequests.getData(this.buildSearchParams());
    };
    ServerSearchDataSource.prototype.filterModelChanged = function () {
        return !this.object.areEqual(this.getFilterModel(), this.filterModel);
    };
    ServerSearchDataSource.prototype.buildSearchParams = function () {
        var searchModel = this.getFilterModel();
        if (searchModel != null) {
            searchModel.search = this.search;
        }
        else {
            searchModel = this.search;
        }
        return searchModel;
    };
    return ServerSearchDataSource;
})(dataSourceBase_service_1.DataSourceBase);
exports.ServerSearchDataSource = ServerSearchDataSource;
serverSearchDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function serverSearchDataSourceFactory(observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet, searchFilter, getFilterModel, validateModel) {
            return new ServerSearchDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.serverSearchDataSourceFactory = serverSearchDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName, __object.moduleName, __synchronizedRequests.moduleName])
    .factory(exports.factoryName, serverSearchDataSourceFactory);
//# sourceMappingURL=serverSearchDataSource.service.js.map