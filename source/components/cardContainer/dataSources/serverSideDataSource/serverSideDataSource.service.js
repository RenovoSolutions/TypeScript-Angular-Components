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
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
exports.factoryName = 'serverSideDataSource';
var ServerSideDataSource = (function (_super) {
    __extends(ServerSideDataSource, _super);
    function ServerSideDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
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
        this.redrawing.next(null);
    };
    return ServerSideDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.ServerSideDataSource = ServerSideDataSource;
serverSideDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.objectServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
function serverSideDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new ServerSideDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.serverSideDataSourceFactory = serverSideDataSourceFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, serverSideDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyU2lkZURhdGFTb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlclNpZGVEYXRhU291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQTZDLDhCQUE4QixDQUFDLENBQUE7QUFLNUUsd0NBQW9FLDRCQUE0QixDQUFDLENBQUE7QUFDakcsNENBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFDNUYscUJBQXFDLGtCQUFrQixDQUFDLENBQUE7QUFFN0Msa0JBQVUsR0FBVyxpRUFBaUUsQ0FBQztBQUN2RixtQkFBVyxHQUFXLHNCQUFzQixDQUFDO0FBK0J4RDtJQUFxRCx3Q0FBMEI7SUFDOUUsOEJBQVksVUFBNEMsRUFDcEQsbUJBQXlDLEVBQ3pDLEtBQTRCLEVBQ3BCLE1BQStCLEVBQ3ZDLDJCQUFnRjtRQUNuRixrQkFBVyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFGckUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7SUFHM0MsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRVMsd0NBQVMsR0FBbkI7UUFDQyxJQUFJLGdCQUFnQixHQUF5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBd0M7WUFDM0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLE1BQXdDO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFXO2dCQUNwQyxNQUFNLENBQUM7b0JBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztvQkFDekIsU0FBUyxFQUFFLG9CQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3BELENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUM3QjtTQUNELENBQUM7SUFDSCxDQUFDO0lBRVMsNENBQWEsR0FBdkIsVUFBd0IsTUFBVztRQUNsQyxJQUFJLElBQUksR0FBbUQsTUFBTSxDQUFDO1FBQ2xFLGdCQUFLLENBQUMsYUFBYSxZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQS9DRCxDQUFxRCx5Q0FBZSxHQStDbkU7QUEvQ1ksNEJBQW9CLHVCQStDaEMsQ0FBQTtBQU1ELDJCQUEyQixDQUFDLE9BQU8sR0FBRyxDQUFDLGtEQUFvQixFQUFFLHdDQUFTLENBQUMsZ0JBQWdCLEVBQUUsd0NBQVMsQ0FBQyxpQkFBaUIsRUFBRyx3Q0FBUyxDQUFDLCtCQUErQixDQUFDLENBQUM7QUFDbEsscUNBQTRDLG1CQUF5QyxFQUN2RSxLQUE0QixFQUM1QixNQUErQixFQUMvQiwyQkFBZ0Y7SUFDN0YsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFZLFVBQTRDO1lBQ2xFLE1BQU0sQ0FBQyxJQUFJLG9CQUFvQixDQUFZLFVBQVUsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFDekgsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBVmUsbUNBQTJCLDhCQVUxQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxPQUFPLENBQUMsbUJBQVcsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDIn0=