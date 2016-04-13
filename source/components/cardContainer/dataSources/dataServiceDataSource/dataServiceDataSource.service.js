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
var __synchronizedRequests = typescript_angular_utilities_1.services.synchronizedRequests;
var asyncDataSource_service_1 = require('../asyncDataSource.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
exports.factoryName = 'dataServiceDataSource';
var DataServiceDataSource = (function (_super) {
    __extends(DataServiceDataSource, _super);
    function DataServiceDataSource(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory) {
        _super.call(this, getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
        this.countFilterGroups = true;
        if (_.isFunction(getDataSet)) {
            this.reload();
        }
    }
    return DataServiceDataSource;
}(asyncDataSource_service_1.AsyncDataSource));
exports.DataServiceDataSource = DataServiceDataSource;
dataServiceDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName, __synchronizedRequests.factoryName];
function dataServiceDataSourceFactory(observableFactory, dataSourceProcessor, array, synchronizedRequests) {
    'use strict';
    return {
        getInstance: function (getDataSet) {
            return new DataServiceDataSource(getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequests);
        },
    };
}
exports.dataServiceDataSourceFactory = dataServiceDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName])
    .factory(exports.factoryName, dataServiceDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNlcnZpY2VEYXRhU291cmNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkYXRhU2VydmljZURhdGFTb3VyY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7Ozs7OztBQUViLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBQ25DLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCLDZDQUF5Qiw4QkFBOEIsQ0FBQyxDQUFBO0FBQ3hELElBQU8sWUFBWSxHQUFHLHVDQUFRLENBQUMsVUFBVSxDQUFDO0FBQzFDLElBQU8sT0FBTyxHQUFHLHVDQUFRLENBQUMsS0FBSyxDQUFDO0FBQ2hDLElBQU8sc0JBQXNCLEdBQUcsdUNBQVEsQ0FBQyxvQkFBb0IsQ0FBQztBQUU5RCx3Q0FBb0UsNEJBQTRCLENBQUMsQ0FBQTtBQUNqRyw0Q0FBMkQsZ0NBQWdDLENBQUMsQ0FBQTtBQUVqRixrQkFBVSxHQUFXLGtFQUFrRSxDQUFDO0FBQ3hGLG1CQUFXLEdBQVcsdUJBQXVCLENBQUM7QUFRekQ7SUFBc0QseUNBQTBCO0lBQy9FLCtCQUFZLFVBQTJDLEVBQ25ELGlCQUF5RCxFQUN6RCxtQkFBeUMsRUFDekMsS0FBNEIsRUFDNUIsMkJBQWdGO1FBQ25GLGtCQUFNLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUM5RixJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNmLENBQUM7SUFDRixDQUFDO0lBQ0YsNEJBQUM7QUFBRCxDQUFDLEFBYkQsQ0FBc0QseUNBQWUsR0FhcEU7QUFiWSw2QkFBcUIsd0JBYWpDLENBQUE7QUFNRCw0QkFBNEIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLGtEQUFvQixFQUFFLE9BQU8sQ0FBQyxXQUFXLEVBQUUsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakosc0NBQTZDLGlCQUF5RCxFQUMxRixtQkFBeUMsRUFDekMsS0FBNEIsRUFDNUIsb0JBQXlFO0lBQ3BGLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBWSxVQUEyQztZQUNqRSxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBaUIsVUFBVSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLEtBQUssRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ25JLENBQUM7S0FDRCxDQUFDO0FBQ0gsQ0FBQztBQVZlLG9DQUE0QiwrQkFVM0MsQ0FBQTtBQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3ZFLE9BQU8sQ0FBQyxtQkFBVyxFQUFFLDRCQUE0QixDQUFDLENBQUMifQ==