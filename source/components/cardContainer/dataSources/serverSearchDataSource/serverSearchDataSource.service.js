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
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSearchDataSource';
exports.factoryName = 'serverSearchDataSource';
var ServerSearchDataSource = (function (_super) {
    __extends(ServerSearchDataSource, _super);
    function ServerSearchDataSource(getDataSet, searchFilter, observableFactory, dataSourceProcessor, array, object, $q) {
        var _this = this;
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.getDataSet = getDataSet;
        this.searchFilter = searchFilter;
        this.object = object;
        this.$q = $q;
        this.minSearchLength = 4;
        this.resolveReload = function (data) {
            _this.loadingDataSet = false;
            _this.rawDataSet = data;
            _this.refresh();
            _this.observable.fire('reloaded');
            _this.observable.fire('changed');
        };
        this.countFilterGroups = true;
        this.search = searchFilter.searchText;
        searchFilter.minSearchLength = this.minSearchLength;
    }
    ServerSearchDataSource.prototype.refresh = function () {
        if (this.searchFilter.searchText !== this.search) {
            this.reload();
        }
        else {
            _super.prototype.refresh.call(this);
        }
    };
    ServerSearchDataSource.prototype.reload = function () {
        this.search = this.searchFilter.searchText;
        if (this.object.isNullOrEmpty(this.searchFilter.searchText)
            || this.searchFilter.searchText.length < this.minSearchLength) {
            this.resolveReload(null);
            return;
        }
        this.dataSet = null;
        this.rawDataSet = null;
        this.loadingDataSet = true;
        this.$q.when(this.getDataSet(this.search)).then(this.resolveReload);
    };
    return ServerSearchDataSource;
})(dataSourceBase_service_1.DataSourceBase);
exports.ServerSearchDataSource = ServerSearchDataSource;
serverSearchDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, '$q'];
function serverSearchDataSourceFactory(observableFactory, dataSourceProcessor, array, object, $q) {
    'use strict';
    return {
        getInstance: function (getDataSet, searchFilter) {
            return new ServerSearchDataSource(getDataSet, searchFilter, observableFactory, dataSourceProcessor, array, object, $q);
        },
    };
}
exports.serverSearchDataSourceFactory = serverSearchDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName, __object.moduleName])
    .factory(exports.factoryName, serverSearchDataSourceFactory);
//# sourceMappingURL=serverSearchDataSource.service.js.map