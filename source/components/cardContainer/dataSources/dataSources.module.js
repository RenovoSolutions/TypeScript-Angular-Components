'use strict';
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var sorts_module_1 = require('../sorts/sorts.module');
var dataPager = require('./dataPager/dataPager.service');
exports.dataPager = dataPager;
var dataServiceDataSource = require('./dataServiceDataSource/dataServiceDataSource.service');
exports.dataServiceDataSource = dataServiceDataSource;
var simpleDataSource = require('./simpleDataSource/simpleDataSource.service');
exports.simpleDataSource = simpleDataSource;
var serverSearchDataSource = require('./serverSearchDataSource/serverSearchDataSource.service');
exports.serverSearchDataSource = serverSearchDataSource;
var events = require('./dataSourceEvents');
exports.events = events;
var dataSourceProcessor = require('./dataSourceProcessor.service');
exports.dataSourceProcessor = dataSourceProcessor;
var dataSourceBase = require('./dataSourceBase.service');
exports.dataSourceBase = dataSourceBase;
__export(require('./dataSource'));
exports.moduleName = 'rl.ui.components.cardContainer.dataSources';
angular.module(exports.moduleName, [
    typescript_angular_utilities_1.services.object.moduleName,
    sorts_module_1.moduleName,
    dataPager.moduleName,
    dataServiceDataSource.moduleName,
    simpleDataSource.moduleName,
    serverSearchDataSource.moduleName,
])
    .service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
//# sourceMappingURL=dataSources.module.js.map