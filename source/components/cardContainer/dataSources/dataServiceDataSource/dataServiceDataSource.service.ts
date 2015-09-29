'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.dataServiceDataSource';
export var factoryName: string = 'dataServiceDataSource';

export interface IDataServiceDataSource<TDataType> extends IDataSource<TDataType> {
	reload(): void;
	getDataSet: IDataServiceFunction<TDataType>;
}

export interface IDataServiceFunction<TDataType> {
	(): angular.IPromise<TDataType[]>;
}

export class DataServiceDataSource<TDataType> extends DataSourceBase<TDataType> implements IDataServiceDataSource<TDataType> {
	constructor(public getDataSet: IDataServiceFunction<TDataType>
			, private $q: angular.IQService
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
										, $q: angular.IQService): IDataServiceDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IDataServiceFunction<TDataType>): IDataServiceDataSource<TDataType> {
			return new DataServiceDataSource<TDataType>(getDataSet, $q, observableFactory, dataSourceProcessor, array);
		},
	};
}

angular.module(moduleName, [__observable.moduleName, __array.moduleName])
	.factory(factoryName, dataServiceDataSourceFactory);
