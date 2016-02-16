'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __observable = typescript_angular_utilities_1.services.observable;
var __array = typescript_angular_utilities_1.services.array;
var __object = typescript_angular_utilities_1.services.object;
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
var sort_1 = require('../../sorts/sort');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
exports.factoryName = 'serverSideDataSource';
var ServerSideDataSource = (function (_super) {
    __extends(ServerSideDataSource, _super);
    function ServerSideDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.object = object;
    }
    ServerSideDataSource.prototype.refresh = function () {
        if (!this.reloading) {
            this.reloading = true;
            this.reload();
        }
    };
    ServerSideDataSource.prototype.getParams = function () {
        return {
            filters: _.mapValues(this.filters, function (filter) {
                if (_.isFunction(filter.serialize)) {
                    return filter.serialize();
                }
                return null;
            }),
            sorts: _.map(this.sorts, function (sort) {
                return {
                    column: sort.column.label,
                    direction: sort_1.SortDirection.getFullName(sort.direction),
                };
            }),
            paging: {
                pageNumber: this.pager.pageNumber,
                pageSize: this.pager.pageSize,
            },
        };
    };
    ServerSideDataSource.prototype.resolveReload = function (result) {
        var data = result;
        this.count = data.count;
        _super.prototype.resolveReload.call(this, data.dataSet);
        this.dataSet = this.rawDataSet;
        this.filteredDataSet = this.rawDataSet;
        this.reloading = false;
    };
    return ServerSideDataSource;
})(asyncDataSource_service_1.AsyncDataSource);
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