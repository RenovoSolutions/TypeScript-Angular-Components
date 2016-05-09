'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
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
simpleDataSourceFactory.$inject = [dataSourceProcessor_service_1.processorServiceName, __array.serviceName];
function simpleDataSourceFactory(dataSourceProcessor, array) {
    'use strict';
    return {
        getInstance: function (data) {
            return new SimpleDataSource(data, dataSourceProcessor, array);
        },
    };
}
exports.simpleDataSourceFactory = simpleDataSourceFactory;
angular.module(exports.moduleName, [__array.moduleName])
    .factory(exports.factoryName, simpleDataSourceFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2ltcGxlRGF0YVNvdXJjZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFlBQVksQ0FBQzs7Ozs7O0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFDeEQsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFHaEMsdUNBQStCLDJCQUEyQixDQUFDLENBQUE7QUFDM0QsNENBQTJELGdDQUFnQyxDQUFDLENBQUE7QUFFakYsa0JBQVUsR0FBVyw2REFBNkQsQ0FBQztBQUNuRixtQkFBVyxHQUFXLGtCQUFrQixDQUFDO0FBRXBEO0lBQWlELG9DQUF5QjtJQUN6RSwwQkFBWSxJQUFpQixFQUN6QixtQkFBeUMsRUFDekMsS0FBNEI7UUFDL0Isa0JBQU0sbUJBQW1CLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNGLHVCQUFDO0FBQUQsQ0FBQyxBQVRELENBQWlELHVDQUFjLEdBUzlEO0FBVFksd0JBQWdCLG1CQVM1QixDQUFBO0FBTUQsdUJBQXVCLENBQUMsT0FBTyxHQUFHLENBQUMsa0RBQW9CLEVBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzlFLGlDQUF3QyxtQkFBeUMsRUFDbkUsS0FBNEI7SUFDekMsWUFBWSxDQUFDO0lBQ2IsTUFBTSxDQUFDO1FBQ04sV0FBVyxZQUFZLElBQWlCO1lBQ3ZDLE1BQU0sQ0FBQyxJQUFJLGdCQUFnQixDQUFZLElBQUksRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMxRSxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFSZSwrQkFBdUIsMEJBUXRDLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDOUMsT0FBTyxDQUFDLG1CQUFXLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyJ9