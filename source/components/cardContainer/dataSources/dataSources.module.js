"use strict";
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var sorts_module_1 = require('../sorts/sorts.module');
var clientServerDataSource = require('./clientServerDataSource/clientServerDataSource.service');
exports.clientServerDataSource = clientServerDataSource;
var dataPager = require('./dataPager/dataPager.service');
exports.dataPager = dataPager;
var dataServiceDataSource = require('./dataServiceDataSource/dataServiceDataSource.service');
exports.dataServiceDataSource = dataServiceDataSource;
var serverSideDataSource = require('./serverSideDataSource/serverSideDataSource.service');
exports.serverSideDataSource = serverSideDataSource;
var simpleDataSource = require('./simpleDataSource/simpleDataSource.service');
exports.simpleDataSource = simpleDataSource;
var smartDataSource = require('./smartDataSource/smartDataSource.service');
exports.smartDataSource = smartDataSource;
var dataSourceProcessor = require('./dataSourceProcessor.service');
exports.dataSourceProcessor = dataSourceProcessor;
var dataSourceBase = require('./dataSourceBase.service');
exports.dataSourceBase = dataSourceBase;
exports.moduleName = 'rl.ui.components.cardContainer.dataSources';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.downgrade.moduleName,
    sorts_module_1.moduleName,
    clientServerDataSource.moduleName,
    dataPager.moduleName,
    dataServiceDataSource.moduleName,
    serverSideDataSource.moduleName,
    simpleDataSource.moduleName,
    smartDataSource.moduleName,
])
    .service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YVNvdXJjZXMubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGF0YVNvdXJjZXMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyw2Q0FBMEIsOEJBQThCLENBQUMsQ0FBQTtBQUV6RCw2QkFBOEMsdUJBQXVCLENBQUMsQ0FBQTtBQUN0RSxJQUFZLHNCQUFzQixXQUFNLHlEQUF5RCxDQUFDLENBQUE7QUFVakcsOEJBQXNCO0FBVHZCLElBQVksU0FBUyxXQUFNLCtCQUErQixDQUFDLENBQUE7QUFVMUQsaUJBQVM7QUFUVixJQUFZLHFCQUFxQixXQUFNLHVEQUF1RCxDQUFDLENBQUE7QUFVOUYsNkJBQXFCO0FBVHRCLElBQVksb0JBQW9CLFdBQU0scURBQXFELENBQUMsQ0FBQTtBQVUzRiw0QkFBb0I7QUFUckIsSUFBWSxnQkFBZ0IsV0FBTSw2Q0FBNkMsQ0FBQyxDQUFBO0FBVS9FLHdCQUFnQjtBQVRqQixJQUFZLGVBQWUsV0FBTSwyQ0FBMkMsQ0FBQyxDQUFBO0FBVTVFLHVCQUFlO0FBVGhCLElBQVksbUJBQW1CLFdBQU0sK0JBQStCLENBQUMsQ0FBQTtBQVVwRSwyQkFBbUI7QUFUcEIsSUFBWSxjQUFjLFdBQU0sMEJBQTBCLENBQUMsQ0FBQTtBQVUxRCxzQkFBYztBQU1KLGtCQUFVLEdBQVcsNENBQTRDLENBQUM7QUFFN0UsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFO0lBQzFCLHdDQUFTLENBQUMsVUFBVTtJQUNwQix5QkFBZTtJQUVmLHNCQUFzQixDQUFDLFVBQVU7SUFDakMsU0FBUyxDQUFDLFVBQVU7SUFDcEIscUJBQXFCLENBQUMsVUFBVTtJQUNoQyxvQkFBb0IsQ0FBQyxVQUFVO0lBQy9CLGdCQUFnQixDQUFDLFVBQVU7SUFDM0IsZUFBZSxDQUFDLFVBQVU7Q0FDMUIsQ0FBQztLQUNBLE9BQU8sQ0FBQyxtQkFBbUIsQ0FBQyxvQkFBb0IsRUFBRSxtQkFBbUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDIn0=