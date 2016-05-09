'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
serverSideDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __object.serviceName, __synchronizedRequests.factoryName];
function serverSideDataSourceFactory(dataSourceProcessor, array, object, synchronizedRequestsFactory) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new ServerSideDataSource(getDataSet, dataSourceProcessor, array, object, synchronizedRequestsFactory);
        },
    };
}
exports.serverSideDataSourceFactory = serverSideDataSourceFactory;
angular.module(exports.moduleName, [])
    .factory(exports.factoryName, serverSideDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyU2lkZURhdGFTb3VyY2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlcnZlclNpZGVEYXRhU291cmNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBWSxDQUFDOzs7Ozs7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBa0MsOEJBQThCLENBQUMsQ0FBQTtBQUNqRSxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUNoQyxJQUFPLFFBQVEsR0FBRyx1Q0FBUSxDQUFDLE1BQU0sQ0FBQztBQUNsQyxJQUFPLHNCQUFzQixHQUFHLHVDQUFRLENBQUMsb0JBQW9CLENBQUM7QUFFOUQsd0NBQW9FLDRCQUE0QixDQUFDLENBQUE7QUFDakcsNENBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFDNUYscUJBQXFDLGtCQUFrQixDQUFDLENBQUE7QUFFN0Msa0JBQVUsR0FBVyxpRUFBaUUsQ0FBQztBQUN2RixtQkFBVyxHQUFXLHNCQUFzQixDQUFDO0FBK0J4RDtJQUFxRCx3Q0FBMEI7SUFDOUUsOEJBQVksVUFBNEMsRUFDcEQsbUJBQXlDLEVBQ3pDLEtBQTRCLEVBQ3BCLE1BQStCLEVBQ3ZDLDJCQUFnRjtRQUNuRixrQkFBVyxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLDJCQUEyQixDQUFDLENBQUM7UUFGckUsV0FBTSxHQUFOLE1BQU0sQ0FBeUI7SUFHM0MsQ0FBQztJQUVELHNDQUFPLEdBQVA7UUFDQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDZixDQUFDO0lBRVMsd0NBQVMsR0FBbkI7UUFDQyxJQUFJLGdCQUFnQixHQUF5QyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsTUFBd0M7WUFDM0ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7UUFDSCxNQUFNLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFDLE1BQXdDO2dCQUMvRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzNCLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNiLENBQUMsQ0FBQztZQUNGLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsVUFBQyxJQUFXO2dCQUNwQyxNQUFNLENBQUM7b0JBQ04sTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSztvQkFDekIsU0FBUyxFQUFFLG9CQUFhLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQ3BELENBQUM7WUFDSCxDQUFDLENBQUM7WUFDRixNQUFNLEVBQUU7Z0JBQ1AsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTthQUM3QjtTQUNELENBQUM7SUFDSCxDQUFDO0lBRVMsNENBQWEsR0FBdkIsVUFBd0IsTUFBVztRQUNsQyxJQUFJLElBQUksR0FBbUQsTUFBTSxDQUFDO1FBQ2xFLGdCQUFLLENBQUMsYUFBYSxZQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNsQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7WUFDckIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsT0FBTztZQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87U0FDckIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNGLDJCQUFDO0FBQUQsQ0FBQyxBQS9DRCxDQUFxRCx5Q0FBZSxHQStDbkU7QUEvQ1ksNEJBQW9CLHVCQStDaEMsQ0FBQTtBQU1ELDJCQUEyQixDQUFDLE9BQU8sR0FBRyxDQUFDLGtEQUFvQixFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLFdBQVcsRUFBRyxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUM3SSxxQ0FBNEMsbUJBQXlDLEVBQ3ZFLEtBQTRCLEVBQzVCLE1BQStCLEVBQy9CLDJCQUFnRjtJQUM3RixZQUFZLENBQUM7SUFDYixNQUFNLENBQUM7UUFDTixXQUFXLFlBQVksVUFBNEM7WUFDbEUsTUFBTSxDQUFDLElBQUksb0JBQW9CLENBQVksVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUN6SCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFWZSxtQ0FBMkIsOEJBVTFDLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsRUFBRSxDQUFDO0tBQzVCLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLDJCQUEyQixDQUFDLENBQUMifQ==