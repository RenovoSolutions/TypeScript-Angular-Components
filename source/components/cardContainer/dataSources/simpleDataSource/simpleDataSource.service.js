"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var dataSourceBase_service_1 = require('../dataSourceBase.service');
var dataSourceProcessor_service_1 = require('../dataSourceProcessor.service');
exports.moduleName = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
exports.factoryName = 'simpleDataSource';
var SimpleDataSource = (function (_super) {
    __extends(SimpleDataSource, _super);
    function SimpleDataSource(data, dataSourceProcessor, array) {
        _super.call(this, dataSourceProcessor, array);
        this.countFilterGroups = false;
        this.rawDataSet = data;
        this.processData();
    }
    return SimpleDataSource;
}(dataSourceBase_service_1.DataSourceBase));
exports.SimpleDataSource = SimpleDataSource;
simpleDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, typescript_angular_utilities_1.downgrade.arrayServiceName];
function simpleDataSourceFactory(dataSourceProcessor, array) {
    'use strict';
    return {
        getInstance: function (data) {
            return new SimpleDataSource(data, dataSourceProcessor, array);
        },
    };
}
exports.simpleDataSourceFactory = simpleDataSourceFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, simpleDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQVksT0FBTyxXQUFNLFNBQVMsQ0FBQyxDQUFBO0FBRW5DLDZDQUFvQyw4QkFBOEIsQ0FBQyxDQUFBO0FBSW5FLHVDQUErQiwyQkFBMkIsQ0FBQyxDQUFBO0FBQzNELDRDQUEyRCxnQ0FBZ0MsQ0FBQyxDQUFBO0FBRWpGLGtCQUFVLEdBQVcsNkRBQTZELENBQUM7QUFDbkYsbUJBQVcsR0FBVyxrQkFBa0IsQ0FBQztBQUVwRDtJQUFpRCxvQ0FBeUI7SUFDekUsMEJBQVksSUFBaUIsRUFDekIsbUJBQXlDLEVBQ3pDLEtBQTRCO1FBQy9CLGtCQUFNLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFDRix1QkFBQztBQUFELENBQUMsQUFURCxDQUFpRCx1Q0FBYyxHQVM5RDtBQVRZLHdCQUFnQixtQkFTNUIsQ0FBQTtBQU1ELHVCQUF1QixDQUFDLE9BQU8sR0FBRyxDQUFDLGtEQUFvQixFQUFFLHdDQUFTLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNyRixpQ0FBd0MsbUJBQXlDLEVBQ25FLEtBQTRCO0lBQ3pDLFlBQVksQ0FBQztJQUNiLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBWSxJQUFpQjtZQUN2QyxNQUFNLENBQUMsSUFBSSxnQkFBZ0IsQ0FBWSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUUsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBUmUsK0JBQXVCLDBCQVF0QyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxPQUFPLENBQUMsbUJBQVcsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDIn0=