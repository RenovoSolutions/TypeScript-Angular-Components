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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnREYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbWFydERhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRzVCLDZDQUFrQyw4QkFBOEIsQ0FBQyxDQUFBO0FBQ2pFLElBQU8sWUFBWSxHQUFHLHVDQUFRLENBQUMsVUFBVSxDQUFDO0FBQzFDLElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sUUFBUSxHQUFHLHVDQUFRLENBQUMsTUFBTSxDQUFDO0FBQ2xDLElBQU8sc0JBQXNCLEdBQUcsdUNBQVEsQ0FBQyxvQkFBb0IsQ0FBQztBQUU5RCx3Q0FBb0UsNEJBQTRCLENBQUMsQ0FBQTtBQUNqRyw0Q0FBMkQsZ0NBQWdDLENBQUMsQ0FBQTtBQUM1RixxQkFBcUMsa0JBQWtCLENBQUMsQ0FBQTtBQUU3QyxrQkFBVSxHQUFXLDREQUE0RCxDQUFDO0FBQ2xGLG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFnQ25EO0lBQWdELG1DQUEwQjtJQU96RSx5QkFBWSxVQUE0QyxFQUNwRCxpQkFBeUQsRUFDekQsbUJBQXlDLEVBQ3pDLEtBQTRCLEVBQ3BCLE1BQStCLEVBQ3ZDLDJCQUFnRjtRQUNuRixrQkFBVyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFGeEYsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7UUFWM0MsY0FBUyxHQUFZLElBQUksQ0FBQztRQUlsQixrQkFBYSxHQUFXLEdBQUcsQ0FBQztJQVNwQyxDQUFDO0lBRUQsc0JBQUksb0NBQU87YUFBWDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ3RCLENB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