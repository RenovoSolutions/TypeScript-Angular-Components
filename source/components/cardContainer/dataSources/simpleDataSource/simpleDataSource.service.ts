import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';
import __array = services.array;

import { IDataSource } from '../dataSource';
import { DataSourceBase } from '../dataSourceBase.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.simpleDataSource';
export var factoryName: string = 'simpleDataSource';

export class SimpleDataSource<TDataType> extends DataSourceBase<TDataType> {
	constructor(data: TDataType[]
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility) {
		super(dataSourceProcessor, array);
		this.countFilterGroups = false;
		this.rawDataSet = data;
		this.processData();
	}
}

export interface ISimpleDataSourceFactory {
	getInstance<TDataType>(data: TDataType[]): IDataSource<TDataType>;
}

simpleDataSourceFactory.$inject = [processorServiceName, downgrade.arrayServiceName];
export function simpleDataSourceFactory(observableFactory: downgrade.IObservableFactory
												, array: __array.IArrayUtility): ISimpleDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(data: TDataType[]): IDataSource<TDataType> {
			return new SimpleDataSource<TDataType>(data, dataSourceProcessor, array);
		},
	};
}

angular.module(moduleName, [downgrade.moduleName])
	.factory(factoryName, simpleDataSourceFactory);
