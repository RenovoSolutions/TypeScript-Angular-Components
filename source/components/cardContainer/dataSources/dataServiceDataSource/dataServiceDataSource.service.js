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
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
exports.factoryName = 'dataServiceDataSource';
var DataServiceDataSource = (function (_super) {
    __extends(DataServiceDataSource, _super);
    function DataServiceDataSource(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.countFilterGroups = true;
        if (_.isFunction(getDataSet)) {
            this.reload();
        }
    }
    return DataServiceDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.DataServiceDataSource = DataServiceDataSource;
dataServiceDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __synchronizedRequests.factoryName];
function dataServiceDataSourceFactory(observableFactory, dataSourceProcessor, array, synchronizedRequests) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new DataServiceDataSource(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequests);
        },
    };
}
exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName])
    .factory(exports.factoryName, dataServiceDataSourceFactory);
//# sourceMappingURL=dataServiceDataSource.service.js.map