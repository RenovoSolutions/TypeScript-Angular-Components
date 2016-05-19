"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
var sort_1 = require('../../sorts/sort');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.smartDataSource';
exports.factoryName = 'smartDataSource';
var SmartDataSource = (function (_super) {
    __extends(SmartDataSource, _super);
    function SmartDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
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
            subscription.unsubscribe();
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
smartDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
function smartDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new SmartDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.smartDataSourceFactory = smartDataSourceFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, smartDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnREYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzbWFydERhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUc1Qiw2Q0FBNkMsOEJBQThCLENBQUMsQ0FBQTtBQUs1RSx3Q0FBb0UsNEJBQTRCLENBQUMsQ0FBQTtBQUNqRyw0Q0FBMkQsZ0NBQWdDLENBQUMsQ0FBQTtBQUM1RixxQkFBcUMsa0JBQWtCLENBQUMsQ0FBQTtBQUU3QyxrQkFBVSxHQUFXLDREQUE0RCxDQUFDO0FBQ2xGLG1CQUFXLEdBQVcsaUJBQWlCLENBQUM7QUFnQ25EO0lBQWdELG1DQUEwQjtJQU96RSx5QkFBWSxVQUE0QyxFQUNwRCxtQkFBeUMsRUFDekMsS0FBNEIsRUFDcEIsTUFBK0IsRUFDdkMsMkJBQWdGO1FBQ25GLGtCQUFXLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUZyRSxXQUFNLEdBQU4sTUFBTSxDQUF5QjtRQVQzQyxjQUFTLEdBQVksSUFBSSxDQUFDO1FBSWxCLGtCQUFhLEdBQVcsR0FBRyxDQUFDO0lBUXBDLENBQUM7SUFFRCxzQkFBSSxvQ0FBTzthQUFYO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDdEIsQ0FBQzthQUVELFVBQVksS0FBd0I7WUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BTEE7SUFPRCxzQ0FBWSxHQUFaO1FBQ0MsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FB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