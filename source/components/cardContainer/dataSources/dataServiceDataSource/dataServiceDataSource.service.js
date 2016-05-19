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
dataServiceDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName, typescript_angular_utilities_1.downgrade.synchronizedRequestsServiceName];
function dataServiceDataSourceFactory(dataSourceProcessor, array, synchronizedRequests) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new DataServiceDataSource(getDataSet, dataSourceProcessor, array, synchronizedRequests);
        },
    };
}
exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, dataServiceDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNlcnZpY2VEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhU2VydmljZURhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBb0MsOEJBQThCLENBQUMsQ0FBQTtBQUluRSx3Q0FBb0UsNEJBQTRCLENBQUMsQ0FBQTtBQUNqRyw0Q0FBMkQsZ0NBQWdDLENBQUMsQ0FBQTtBQUVqRixrQkFBVSxHQUFXLGtFQUFrRSxDQUFDO0FBQ3hGLG1CQUFXLEdBQVcsdUJBQXVCLENBQUM7QUFRekQ7SUFBc0QseUNBQTBCO0lBQy9FLCtCQUFZLFVBQTJDLEVBQ25ELG1CQUF5QyxFQUN6QyxLQUE0QixFQUM1QiwyQkFBZ0Y7UUFDbkYsa0JBQU0sVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO1FBQzNFLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUM7UUFFOUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2YsQ0FBQztJQUNGLENBQUM7SUFDRiw0QkFBQztBQUFELENBQUMsQUFaRCxDQUFzRCx5Q0FBZSxHQVlwRTtBQVpZLDZCQUFxQix3QkFZakMsQ0FBQTtBQU1ELDRCQUE0QixDQUFDLE9BQU8sR0FBRyxDQUFDLGtEQUFvQixFQUFFLHdDQUFTLENBQUMsZ0JBQWdCLEVBQUUsd0NBQVMsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO0FBQ3JJLHNDQUE2QyxtQkFBeUMsRUFDMUUsS0FBNEIsRUFDNUIsb0JBQXlFO0lBQ3BGLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBWSxVQUEyQztZQUNqRSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBaUIsVUFBVSxFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hILENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVRlLG9DQUE0QiwrQkFTM0MsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHdDQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDaEQsT0FBTyxDQUFDLG1CQUFXLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyJ9