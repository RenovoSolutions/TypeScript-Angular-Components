'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;
import __synchronizedRequests = services.synchronizedRequests;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor, processorServiceName } from '../dataSourceProcessor.service';
import { ISort, SortDirection } from '../../sorts/sort';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.serverSideDataSource';
export var factoryName: string = 'serverSideDataSource';

export interface IServerSideDataSource<TDataType> extends IAsyncDataSource<TDataType> {
	filters: { [index: string]: filters.ISerializableFilter };
}

export interface IServerSearchFunction<TDataType> {
	(searchParams: any): angular.IPromise<IDataResult<TDataType>>;
}

export interface IServerSearchParams {
	filters: {[index: string]: any};
	sorts: ISortParams[];
	paging: IPagingParams;
}

export interface ISortParams {
	column: string;
	direction: string;
}

export interface IPagingParams {
	pageNumber: number;
	pageSize: number;
}

export interface IDataResult<TDataType> {
	dataSet: TDataType[];
	count: number;
}

export class ServerSideDataSource<TDataType> extends AsyncDataSource<TDataType> {
	private reloading: boolean;

	constructor(getDataSet: IServerSearchFunction<TDataType>
			, observableFactory: __observable.IObservableServiceFactory
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(<any>getDataSet, observableFactory, dataSourceProcessor, array, synchronizedRequestsFactory);
	}

	refresh(): void {
		if (!this.reloading) {
			this.reloading = true;
			this.reload();
		}
	}

	protected getParams(): IServerSearchParams {
		return {
			filters: _.mapValues(this.filters, (filter: filters.ISerializableFilter): any => {
				if (_.isFunction(filter.serialize)) {
					return filter.serialize();
				}
				return null;
			}),
			sorts: _.map(this.sorts, (sort: ISort): ISortParams => {
				return {
					column: sort.column.label,
					direction: SortDirection.getFullName(sort.direction),
				};
			}),
			paging: {
				pageNumber: this.pager.pageNumber,
				pageSize: this.pager.pageSize,
			},
		};
	}

	protected resolveReload(result: any): void {
		let data: IDataResult<TDataType> = <IDataResult<TDataType>>result;
		this.count = data.count;
		super.resolveReload(data.dataSet);
		this.dataSet = this.rawDataSet;
		this.filteredDataSet = this.rawDataSet;
		this.reloading = false;
	}
}

export interface IServerSideDataSourceFactory {
	getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
}

serverSideDataSourceFactory.$inject = [__observable.factoryName, processorServiceName, __array.serviceName, __object.serviceName,  __synchronizedRequests.factoryName];
export function serverSideDataSourceFactory(observableFactory: __observable.IObservableServiceFactory
												, dataSourceProcessor: IDataSourceProcessor
												, array: __array.IArrayUtility
												, object: __object.IObjectUtility
												, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory): IServerSideDataSourceFactory {
	'use strict';
	return {
		getInstance<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType> {
			return new ServerSideDataSource<TDataType>(getDataSet, observableFactory, dataSourceProcessor, array, object, synchronizedRequestsFactory);
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, serverSideDataSourceFactory);
