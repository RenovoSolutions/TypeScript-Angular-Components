// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSource.ts' />
/// <reference path='../dataSourceBase.service.ts' />
/// <reference path='../dataSourceProcessor.service.ts' />

module rl.ui.components.cardContainer.dataSources.simpleDataSource {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
	export var factoryName: string = 'simpleDataSource';
	
	import __observable = rl.utilities.services.observable;
	import __array = rl.utilities.services.array;
	
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
}
