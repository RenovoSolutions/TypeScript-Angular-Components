'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
export var factoryName: string = 'simpleDataSource';

export class SimpleDataSource<TDataType> extends DataSourceBase<TDataType> {
	constructor(data: TDataType[]
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility) {
		super(observableFactory, dataSourceProcessor, array);
		this.countFilterGroups = false;
		this.rawDataSet = data;
		this.processData();
	}
}

export interface ISimpleDataSourceFactory {
	getInstance<TDataType>(data: TDataType[]): IDataSource<TDataType>;
}

simpleDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName];
export function simpleDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
												, dataSourceProcessor: IDataSourceProcessor
												, array: __array.IArrayUtility): ISimpleDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(data: TDataType[]): IDataSource<TDataType> {
			return new SimpleDataSource<TDataType>(data, observableFactory, dataSourceProcessor, array);
		},
	};
}

angular.module(moduleName, [__observable.moduleName, __array.moduleName])
	.factory(factoryName, simpleDataSourceFactory);
