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
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
exports.factoryName = 'dataServiceDataSource';
var DataServiceDataSource = (function (_super) {
    __extends(DataServiceDataSource, _super);
    function DataServiceDataSource(getDataSet, $q, observableFactory, dataSourceProcessor, array) {
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.getDataSet = getDataSet;
        this.$q = $q;
        this.countFilterGroups = true;
        if (_.isFunction(this.getDataSet)) {
            this.reload();
        }
    }
    DataServiceDataSource.prototype.reload = function () {
        var _this = this;
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.$q.when(this.getDataSet()).then(function (data) {
            _this.loadingDataSet = false;
            _this.rawDataSet = data;
            _this.refresh();
            _this.observable.fire('reloaded');
            _this.observable.fire('changed');
        });
    };
    return DataServiceDataSource;
})(dataSourceBase_service_1.DataSourceBase);
exports.DataServiceDataSource = DataServiceDataSource;
dataServiceDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, '$q'];
function dataServiceDataSourceFactory(observableFactory, dataSourceProcessor, array, $q) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new DataServiceDataSource(getDataSet, $q, observableFactory, dataSourceProcessor, array);
        },
    };
}
exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName])
    .factory(exports.factoryName, dataServiceDataSourceFactory);
//# sourceMappingURL=dataServiceDataSource.service.js.map