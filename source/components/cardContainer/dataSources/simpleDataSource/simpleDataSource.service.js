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
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
exports.factoryName = 'simpleDataSource';
var SimpleDataSource = (function (_super) {
    __extends(SimpleDataSource, _super);
    function SimpleDataSource(data, observableFactory, dataSourceProcessor, array) {
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.countFilterGroups = false;
        this.rawDataSet = data;
        this.processData();
    }
    return SimpleDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.SimpleDataSource = SimpleDataSource;
simpleDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName];
function simpleDataSourceFactory(observableFactory, dataSourceProcessor, array) {
    'use strict';
    return {
        getInstance: function (data) {
            return new SimpleDataSource(data, observableFactory, dataSourceProcessor, array);
        },
    };
}
exports.simpleDataSourceFactory = simpleDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName])
    .factory(exports.factoryName, simpleDataSourceFactory);
//# sourceMappingURL=simpleDataSource.service.js.map