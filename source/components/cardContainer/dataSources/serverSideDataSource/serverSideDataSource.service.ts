import * as _ from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __array = services.array;
import __object = services.object;

import { IServerSearchFunction, IServerSearchParams, ISortParams, IPagingParams, IDataResult } from '../asyncTypes';
import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessorOld } from '../processor/dataSourceProcessorOld.service';
import { ISort, SortDirection } from '../../sorts/sort';

export interface IServerSideDataSource<TDataType> extends IAsyncDataSource<TDataType> {
	filters: filters.ISerializableFilter<any>[];
}

export class ServerSideDataSource<TDataType> extends AsyncDataSource<TDataType> {
	constructor(getDataSet: IServerSearchFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessorOld
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility) {
		super(<any>getDataSet, dataSourceProcessor, array);
	}

	refresh(): void {
		this.reload();
	}

	protected getParams(): IServerSearchParams {
		let filterDictionary: { [index: string]: filters.IFilter } = this.array.toDictionary(this.filters, (filter: filters.ISerializableFilter<any>): string => {
			return filter.type;
		});
		return {
			filters: _.mapValues(filterDictionary, (filter: filters.ISerializableFilter<any>): any => {
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
		super.resolveReload(data.dataSet);
		this.setProcessedData({
			count: data.count,
			filteredDataSet: data.dataSet,
			dataSet: data.dataSet,
		});
		this.redrawing.next(null);
	}
}
