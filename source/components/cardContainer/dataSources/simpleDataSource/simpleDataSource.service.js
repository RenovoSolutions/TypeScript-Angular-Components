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
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
exports.factoryName = 'simpleDataSource';
var SimpleDataSource = (function (_super) {
    __extends(SimpleDataSource, _super);
    function SimpleDataSource(data, observableFactory, dataSourceProcessor, array) {
        _super.call(this, observableFactory, dataSourceProcessor, array);
        this.countFilterGroups = false;
        this.rawDataSet = data;
        this.processData();
    }
    return SimpleDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.SimpleDataSource = SimpleDataSource;
simpleDataSourceFactory.$inject = [__observable.factoryName, dataSourceProcessor_service_1.processorServiceName, __array.serviceName];
function simpleDataSourceFactory(observableFactory, dataSourceProcessor, array) {
    'use strict';
    return {
        getInstance: function (data) {
            return new SimpleDataSource(data, observableFactory, dataSourceProcessor, array);
        },
    };
}
exports.simpleDataSourceFactory = simpleDataSourceFactory;
angular.module(exports.moduleName, [__observable.moduleName, __array.moduleName])
    .factory(exports.factoryName, simpleDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxZQUFZLEdBQUcsdUNBQVEsQ0FBQyxVQUFVLENBQUM7QUFDMUMsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFHaEMsdUNBQStCLDJCQUEyQixDQUFDLENBQUE7QUFDM0QsNENBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFFakYsa0JBQVUsR0FBVyw2REFBNkQsQ0FBQztBQUNuRixtQkFBVyxHQUFXLGtCQUFrQixDQUFDO0FBRXBEO0lBQWlELG9DQUF5QjtJQUN6RSwwQkFBWSxJQUFpQixFQUN6QixpQkFBeUQsRUFDekQsbUJBQXlDLEVBQ3pDLEtBQTRCO1FBQy9CLGtCQUFNLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFWRCxDQUFpRCx1Q0FBYyxHQVU5RDtBQVZZLHdCQUFnQixtQkFVNUIsQ0FBQTtBQU1ELHVCQUF1QixDQUFDLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsa0RBQW9CLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hHLGlDQUF3QyxpQkFBeUQsRUFDbkYsbUJBQXlDLEVBQ3pDLEtBQTRCO0lBQ3pDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBWSxJQUFpQjtZQUN2QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBWSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0YsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBVGUsK0JBQXVCLDBCQVN0QyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDdkUsT0FBTyxDQUFDLG1CQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyJ9