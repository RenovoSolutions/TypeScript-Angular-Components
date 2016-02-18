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
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.clientServerDataSource';
exports.factoryName = 'clientServerDataSource';
var ClientServerDataSource = (function (_super) {
    __extends(ClientServerDataSource, _super);
    function ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.searchFilter = searchFilter;
        this.getFilterModel = getFilterModel;
        this.validateModel = validateModel;
        this.object = object;
        this.minSearchLength = 4;
        this.getFilterModel = this.getFilterModel || function () { return null; };
        this.validateModel = this.validateModel || function () { return true; };
        this.countFilterGroups = true;
        this.search = searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        searchFilter.minSearchLength = this.minSearchLength;
    }
    ClientServerDataSource.prototype.refresh = function () {
        if (this.searchFilter.searchText !== this.search
            || this.filterModelChanged()) {
            this.reload();
        }
        else {
            _super.prototype.refresh.call(this);
        }
    };
    ClientServerDataSource.prototype.reload = function () {
        this.search = this.searchFilter.searchText;
        this.filterModel = _.clone(this.getFilterModel());
        var hasValidSearch = !this.object.isNullOrEmpty(this.search) && this.search.length >= this.minSearchLength;
        var hasValidFilterModel = this.filterModel != null && this.validateModel(this.filterModel);
        if (!hasValidSearch && !hasValidFilterModel) {
            this.resolveReload(null);
            return;
        }
        _super.prototype.reload.call(this);
    };
    ClientServerDataSource.prototype.filterModelChanged = function () {
        return !this.object.areEqual(this.getFilterModel(), this.filterModel);
    };
    ClientServerDataSource.prototype.getParams = function () {
        var searchModel = this.getFilterModel();
        if (searchModel != null) {
            searchModel.search = this.search;
        }
        else {
            searchModel = this.search;
        }
        return searchModel;
    };
    return ClientServerDataSource;
})(asyncDataSource_service_1.AsyncDataSource);
exports.ClientServerDataSource = ClientServerDataSource;
clientServerDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function clientServerDataSourceFactory(observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet, searchFilter, getFilterModel, validateModel) {
            return new ClientServerDataSource(getDataSet, searchFilter, getFilterModel, validateModel, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.clientServerDataSourceFactory = clientServerDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName, __object.moduleName, __synchronizedRequests.moduleName])
    .factory(exports.factoryName, clientServerDataSourceFactory);
//# sourceMappingURL=clientServerDataSource.service.js.map