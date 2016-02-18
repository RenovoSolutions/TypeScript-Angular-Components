'use strict';

import * as _ from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;

import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';
import {
	serviceName as sorterServiceName,
	ISorter,
} from '../sorts/sorter/sorter.service';

export var processorServiceName: string = 'dataSourceProcessor';

export interface IProcessResult<TDataType> {
	count: number;
	filteredDataSet: TDataType[];
	dataSet: TDataType[];
}

export interface IWrappedItem<TItemType> {
	data: TItemType;
	filterData: any; //*filterData
}

export interface IDataSourceProcessor {
	process<TDataType>(sorts: ISort[]
					, filters: filters.IFilter[]
					, pager: IDataPager
					, data: TDataType[]): IProcessResult<TDataType>;
	processAndCount<TDataType>(sorts: ISort[]
							, filters: filters.IFilterWithCounts[]
							, pager: IDataPager
							, data: TDataType[]): IProcessResult<TDataType>;
}

export class DataSourceProcessor implements IDataSourceProcessor{
	static $inject: string[] = [__object.serviceName, sorterServiceName];
	constructor(private object: __object.IObjectUtility
			, private sorter: ISorter) { }

	process<TDataType>(sorts: ISort[]
					, filters: filters.IFilter[]
					, pager: IDataPager
					, data: TDataType[]): IProcessResult<TDataType> {
		var processedData: TDataType[] = data;

		processedData = this.sort(processedData);

		if (this.object.isNullOrEmpty(filters) === false) {
			processedData = _.reduce(filters, (filteredData: TDataType[], filter: filters.IFilter): TDataType[] => {
				// Filter the data set using the filter function on the filter
				return _.filter(filteredData, filter.filter.bind(filter));
			}, processedData);
		}

		var result: IProcessResult<TDataType> = {
			count: (processedData != null ? processedData.length : 0),
			filteredDataSet: processedData,
			dataSet: processedData,
		};

		if (pager != null) {
			result.dataSet = pager.filter(processedData);
		}

		return result;
	}

	processAndCount<TDataType>(sorts: ISort[]
							, filters: filters.IFilterWithCounts[]
							, pager: IDataPager
							, data: TDataType[]): IProcessResult<TDataType> {
		// If there are no filters that need to updated option counts, use the normal processor
		if (this.object.isNullOrEmpty(filters)
			|| _.some(filters, (filter: filters.IFilterWithCounts): boolean => { return _.isFunction(filter.updateOptionCounts); }) === false) {
			return this.process(sorts, filters, pager, data);
		}

		var processedData: TDataType[] = data;

		processedData = this.sort(processedData);

		var wrappedData: IWrappedItem<TDataType>[] = this.wrapData(processedData);

		// Run filtration logic and compute visible items
		_.each(filters, (filter: any /* filters.IFilterWithCounts */): void => {
			_.each(wrappedData, (item: IWrappedItem<TDataType>): void => {
				item.filterData[filter.type] = filter.filter(item.data);
			});
		});

		// Give each filter a chance to update option counts
		_.each(filters, (filter: any /* filters.IFilterWithCounts */): void => {
			if (_.isFunction(filter.updateOptionCounts)) {
				var otherFiltersApplied: IWrappedItem<TDataType>[] = _.filter(wrappedData, (item: IWrappedItem<TDataType>): boolean => {
					// Omit the true or false of the current filter an
					//  only filter out items removed by other filters
					var filterData: any = _.omit(item.filterData, filter.type); //*filterData
					return _.every(_.values(filterData));
				});

				filter.updateOptionCounts(this.unwrapData(otherFiltersApplied));
			}
		});

		// Filter down to final data set by removing items that don't match all filters
		wrappedData = _.filter(wrappedData, (item: IWrappedItem<TDataType>): boolean => {
			return _.every(_.values(item.filterData));
		});

		processedData = this.unwrapData(wrappedData);

		var result: IProcessResult<TDataType> = {
			count: processedData.length,
			filteredDataSet: processedData,
			dataSet: processedData,
		};

		if (pager != null) {
			result.dataSet = pager.filter(processedData);
		}

		return result;
	}

	sort(sorts: ISort[], data: TDataType[]): TDataType[] {
		if (this.object.isNullOrEmpty(sorts) === false) {
			processedData = this.sorter.sort(processedData, sorts);
		}
	}

	private wrapData<TDataType>(data: TDataType[]): IWrappedItem<TDataType>[] {
		return _.map(data, (item: TDataType): IWrappedItem<TDataType> => {
			return {
				data: item,
				filterData: {},
			};
		});
	}

	private unwrapData<TDataType>(data: IWrappedItem<TDataType>[]): TDataType[] {
		return _.map(data, (item: IWrappedItem<TDataType>): TDataType => {
			return item.data;
		});
	}
}
