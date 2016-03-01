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
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.smartDataSource';
exports.factoryName = 'smartDataSource';
var SmartDataSource = (function (_super) {
    __extends(SmartDataSource, _super);
    function SmartDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.object = object;
        this.throttled = true;
        this.throttleLimit = 200;
    }
    Object.defineProperty(SmartDataSource.prototype, "filters", {
        get: function () {
            return this._filters;
        },
        set: function (value) {
            this._filters = value;
            this.setupSubscriptions();
        },
        enumerable: true,
        configurable: true
    });
    SmartDataSource.prototype.onSortChange = function () {
        if (this.throttled) {
            this.reload();
        }
        else {
            _super.prototype.onSortChange.call(this);
        }
    };
    SmartDataSource.prototype.refresh = function () {
        if (this.throttled) {
            this.reload();
        }
        else {
            _super.prototype.refresh.call(this);
        }
    };
    SmartDataSource.prototype.getParams = function () {
        this.updateAppliedFilters();
        return {
            filters: this.appliedFilters,
            sorts: _.map(this.sorts, function (sort) {
                return {
                    column: sort.column.label,
                    direction: sort_1.SortDirection.getFullName(sort.direction),
                };
            }),
            paging: {
                pageNumber: 1,
                pageSize: this.throttleLimit,
            },
        };
    };
    SmartDataSource.prototype.updateAppliedFilters = function () {
        var filterDictionary = this.array.toDictionary(this.filters, function (filter) {
            return filter.type;
        });
        this.appliedFilters = _.mapValues(filterDictionary, function (filter) {
            if (_.isFunction(filter.serialize)) {
                return filter.serialize();
            }
            return null;
        });
        this.appliedFilters = _.omitBy(this.appliedFilters, function (value) { return value == null; });
    };
    SmartDataSource.prototype.setupSubscriptions = function () {
        var _this = this;
        _.each(this.subscriptions, function (subscription) {
            subscription.dispose();
        });
        this.subscriptions = [];
        _.each(this.filters, function (filter) {
            if (_.isFunction(filter.subscribe)) {
                _this.subscriptions.push(filter.subscribe(function () { _this.onFilterChange(filter); }));
            }
        });
    };
    SmartDataSource.prototype.onFilterChange = function (filter) {
        if (_.has(this.appliedFilters, filter.type)) {
            this.reload();
        }
    };
    SmartDataSource.prototype.resolveReload = function (result) {
        var data = result;
        this.throttled = (data.count > data.dataSet.length);
        _super.prototype.resolveReload.call(this, data.dataSet);
        this.count = data.count;
        this.isEmpty = data.isEmpty;
    };
    return SmartDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.SmartDataSource = SmartDataSource;
smartDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function smartDataSourceFactory(observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new SmartDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.smartDataSourceFactory = smartDataSourceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, smartDataSourceFactory);
//# sourceMappingURL=smartDataSource.service.js.map