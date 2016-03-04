'use strict';
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
var events = require('./dataSourceEvents');
exports.events = events;
var dataSourceProcessor = require('./dataSourceProcessor.service');
exports.dataSourceProcessor = dataSourceProcessor;
var dataSourceBase = require('./dataSourceBase.service');
exports.dataSourceBase = dataSourceBase;
exports.moduleName = 'rl.ui.components.cardContainer.dataSources';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.services.object.moduleName,
    sorts_module_1.moduleName,
    clientServerDataSource.moduleName,
    dataPager.moduleName,
    dataServiceDataSource.moduleName,
    serverSideDataSource.moduleName,
    simpleDataSource.moduleName,
    smartDataSource.moduleName,
])
    .service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
//# sourceMappingURL=dataSources.module.js.map