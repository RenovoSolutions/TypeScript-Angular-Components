'use strict';

import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';

import { moduleName as sortsModuleName } from '../sorts/sorts.module';
import * as dataPager from './dataPager/dataPager.service';
import * as dataServiceDataSource from './dataServiceDataSource/dataServiceDataSource.service';
import * as simpleDataSource from './simpleDataSource/simpleDataSource.service';
import * as serverSearchDataSource from './serverSearchDataSource/serverSearchDataSource.service';
import * as dataSourceProcessor from './dataSourceProcessor.service';
import * as dataSourceBase from './dataSourceBase.service';

export {
	dataPager,
	dataServiceDataSource,
	simpleDataSource,
	serverSearchDataSource,
	dataSourceProcessor,
	dataSourceBase,
};

export * from './dataSource';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources';

angular.module(moduleName, [
	services.object.moduleName,
	sortsModuleName,

	dataPager.moduleName,
	dataServiceDataSource.moduleName,
	simpleDataSource.moduleName,
	serverSearchDataSource.moduleName,
])
	.service(dataSourceProcessor.processorServiceName, dataSourceProcessor.DataSourceProcessor);
