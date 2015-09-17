// uses typings/angularjs
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSource.ts' />
/// <reference path='../dataSourceBase.service.ts' />
/// <reference path='../dataSourceProcessor.service.ts' />

module rl.ui.components.cardContainer.dataSources.dataServiceDataSource {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
	export var factoryName: string = 'dataServiceDataSource';
	
	import __observable = rl.utilities.services.observable;
	import __array = rl.utilities.services.array;
	
	export interface IDataServiceDataSource<TDataType> extends IDataSource<TDataType> {
		reload(): void;
		getDataSet: IDataServiceFunction<TDataType>;
	}
	
	export interface IDataServiceFunction<TDataType> {
		(): ng.IPromise<TDataType[]>;
	}
	
	export class DataServiceDataSource<TDataType> extends DataSourceBase<TDataType> implements IDataServiceDataSource<TDataType> {
		constructor(public getDataSet: IDataServiceFunction<TDataType>
				, private $q: ng.IQService
				, observableFactory: __observable.IObservableServiceFactory
				, dataSourceProcessor: IDataSourceProcessor
				, array: __array.IArrayUtility) {
			super(observableFactory, dataSourceProcessor, array);
			this.countFilterGroups = true;
	
			if (_.isFunction(this.getDataSet)) {
				this.reload();
			}
		}
	
		reload(): void {
			this.dataSet = null;
			this.rawDataSet = null;
			this.loadingDataSet = true;
	
			this.$q.when(this.getDataSet()).then((data: TDataType[]): void => {
				this.loadingDataSet = false;
				this.rawDataSet = data;
	
				this.refresh();
				this.observable.fire('reloaded');
				this.observable.fire('changed');
			});
		}
	}
	
	export interface IDataServiceDataSourceFactory {
		getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IDataServiceDataSource<TDataType>;
	}
	
	dataServiceDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName, '$q'];
	export function dataServiceDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
											, dataSourceProcessor: IDataSourceProcessor
											, array: __array.IArrayUtility
											, $q: ng.IQService): IDataServiceDataSourceFactory {
		'use strict';
		return {
			getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IDataServiceDataSource<TDataType> {
				return new DataServiceDataSource<TDataType>(getDataSet, $q, observableFactory, dataSourceProcessor, array);
			},
		};
	}
	
	angular.module(moduleName, [__observable.moduleName, __array.moduleName])
		.factory(factoryName, dataServiceDataSourceFactory);
}
