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
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
exports.factoryName = 'dataServiceDataSource';
var DataServiceDataSource = (function (_super) {
    __extends(DataServiceDataSource, _super);
    function DataServiceDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.countFilterGroups = true;
        if (_.isFunction(getDataSet)) {
            this.reload();
        }
    }
    return DataServiceDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.DataServiceDataSource = DataServiceDataSource;
dataServiceDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __synchronizedRequests.factoryName];
function dataServiceDataSourceFactory(dataSourceProcessor, array, synchronizedRequests) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new DataServiceDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequests);
        },
    };
}
exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
angular.module(exports.moduleName, [__array.moduleName])
    .factory(exports.factoryName, dataServiceDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNlcnZpY2VEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhU2VydmljZURhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sc0JBQXNCLEdBQUcsdUNBQVEsQ0FBQyxvQkFBb0IsQ0FBQztBQUU5RCx3Q0FBb0UsNEJBQTRCLENBQUMsQ0FBQTtBQUNqRyw0Q0FBMkQsZ0NBQWdDLENBQUMsQ0FBQTtBQUVqRixrQkFBVSxHQUFXLGtFQUFrRSxDQUFDO0FBQ3hGLG1CQUFXLEdBQVcsdUJBQXVCLENBQUM7QUFRekQ7SUFBc0QseUNBQTBCO0lBQy9FLCtCQUFZLFVBQTJDLEVBQ25ELG1CQUF5QyxFQUN6QyxLQUE0QixFQUM1QiwyQkFBZ0Y7UUFDbkYsa0JBQU0sVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNGLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUFaRCxDQUFzRCx5Q0FBZSxHQVlwRTtBQVpZLDZCQUFxQix3QkFZakMsQ0FBQTtBQU1ELDRCQUE0QixDQUFDLE9BQU8sR0FBRyxDQUFDLGtEQUFvQixFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDdkgsc0NBQTZDLG1CQUF5QyxFQUMxRSxLQUE0QixFQUM1QixvQkFBeUU7SUFDcEYsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFZLFVBQTJDO1lBQ2pFLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFpQixVQUFVLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixDQUFDLENBQUM7UUFDaEgsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBVGUsb0NBQTRCLCtCQVMzQyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQzlDLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLDRCQUE0QixDQUFDLENBQUMifQ==