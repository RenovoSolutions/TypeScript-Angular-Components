'use strict';

import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';

import { moduleName as sortsModuleName } from '../sorts/sorts.module';
import * as clientServerDataSource from './clientServerDataSource/clientServerDataSource.service';
import * as dataPager from './dataPager/dataPager.service';
import * as dataServiceDataSource from './dataServiceDataSource/dataServiceDataSource.service';
import * as serverSideDataSource from './serverSideDataSource/serverSideDataSource.service';
import * as simpleDataSource from './simpleDataSource/simpleDataSource.service';
import * as smartDataSource from './smartDataSource/smartDataSource.service';
import * as dataSourceProcessor from './dataSourceProcessor.service';
import * as dataSourceBase from './dataSourceBase.service';

export {
	clientServerDataSource,
	dataPager,
	dataServiceDataSource,
	serverSideDataSource,
	simpleDataSource,
	smartDataSource,
	dataSourceProcessor,
	dataSourceBase,
};

export * from './dataSource';
export { IAsyncDataSource, IDataSetFunction } from './asyncDataSource.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources';

angular.module(moduleName, [
	services.object.moduleName,
	sortsModuleName,

	clientServerDataSource.moduleName,
	dataPager.moduleName,
	dataServiceDataSource.moduleName,
	serverSideDataSource.moduleName,
	simpleDataSource.moduleName,
	smartDataSource.moduleName,
])
	.service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
