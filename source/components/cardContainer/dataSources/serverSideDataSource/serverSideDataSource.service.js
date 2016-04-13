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
var events = require('../dataSourceEvents');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
exports.factoryName = 'serverSideDataSource';
var ServerSideDataSource = (function (_super) {
    __extends(ServerSideDataSource, _super);
    function ServerSideDataSource(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.object = object;
    }
    ServerSideDataSource.prototype.refresh = function () {
        this.reload();
    };
    ServerSideDataSource.prototype.getParams = function () {
        var filterDictionary = this.array.toDictionary(this.filters, function (filter) {
            return filter.type;
        });
        return {
            filters: _.mapValues(filterDictionary, function (filter) {
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
        _super.prototype.resolveReload.call(this, data.dataSet);
        this.setProcessedData({
            count: data.count,
            filteredDataSet: data.dataSet,
            dataSet: data.dataSet,
        });
        this.observable.fire(events.redrawing);
    };
    return ServerSideDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyU2lkZURhdGFTb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlclNpZGVEYXRhU291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBa0MsOEJBQThCLENBQUMsQ0FBQTtBQUNqRSxJQUFPLFlBQVksR0FBRyx1Q0FBUSxDQUFDLFVBQVUsQ0FBQztBQUMxQyxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLHNCQUFzQixHQUFHLHVDQUFRLENBQUMsb0JBQW9CLENBQUM7QUFFOUQsd0NBQW9FLDRCQUE0QixDQUFDLENBQUE7QUFDakcsNENBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFDNUYscUJBQXFDLGtCQUFrQixDQUFDLENBQUE7QUFDeEQsSUFBWSxNQUFNLFdBQU0scUJBQXFCLENBQUMsQ0FBQTtBQUVuQyxrQkFBVSxHQUFXLGlFQUFpRSxDQUFDO0FBQ3ZGLG1CQUFXLEdBQVcsc0JBQXNCLENBQUM7QUErQnhEO0lBQXFELHdDQUEwQjtJQUM5RSw4QkFBWSxVQUE0QyxFQUNwRCxpQkFBeUQsRUFDekQsbUJBQXlDLEVBQ3pDLEtBQTRCLEVBQ3BCLE1BQStCLEVBQ3ZDLDJCQUFnRjtRQUNuRixrQkFBVyxVQUFVLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFGeEYsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7SUFHM0MsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRVMsd0NBQVMsR0FB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