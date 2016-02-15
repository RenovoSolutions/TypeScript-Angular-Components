'use strict';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;

import { IDataSource } from './dataSource';
import { IDataSourceProcessor, IProcessResult } from './dataSourceProcessor.service';
import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';
import * as events from './dataSourceEvents';

export class DataSourceBase<TDataType> implements IDataSource<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[] = [];
	filters: { [index: string]: filters.IFilter } = {};
	pager: IDataPager;
	count: number = 0;

	countFilterGroups: boolean = false;

	loadingDataSet: boolean = false;

	observable: __observable.IObservableService;

	constructor(observableFactory: __observable.IObservableServiceFactory
			, private dataSourceProcessor: IDataSourceProcessor
			, private array: __array.IArrayUtility) {
		this.observable = observableFactory.getInstance();
	}

	watch<TReturnType>(action: __observable.IAction<TReturnType>, event?: string): __observable.IUnregisterFunction {
		return this.observable.register(action, event);
	}

	processData(): void {
		var processedData: IProcessResult<TDataType>;

		if (this.countFilterGroups) {
			processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
																			, <{ [index: string]: filters.IFilterWithCounts }>this.filters
																			, this.pager
																			, this.rawDataSet);
		} else {
			processedData = this.dataSourceProcessor.process<TDataType>(this.sorts, this.filters, this.pager, this.rawDataSet);
		}
		this.setProcessedData(processedData);
	}
	//used when we need to process data but without client filters.
	processDataNoClientFilters(): void {
		var processedData: IProcessResult<TDataType>;

		if (this.countFilterGroups) {
			processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
																			, null
																			, this.pager
																			, this.rawDataSet);
		} else {
			processedData = this.dataSourceProcessor.process<TDataType>(this.sorts, null, this.pager, this.rawDataSet);
		}
		this.setProcessedData(processedData);
	}

	setProcessedData( processedData: IProcessResult<TDataType>):void {
		this.count = processedData.count;
		this.dataSet = processedData.dataSet;
		this.filteredDataSet = processedData.filteredDataSet;
	}

	refresh(): void {
		if (!this.loadingDataSet) {
			this.processData();
			this.observable.fire(events.redrawing);
		}
	}

	remove(data: TDataType): void {
		var item: TDataType = this.array.remove(this.rawDataSet, data);

		if (item != null) {
			this.observable.fire(events.removed);
			this.observable.fire(events.changed);

			if (this.pager) {
				this.refresh();
			}
		}
	}

	push(data: TDataType): void {
		this.rawDataSet.push(data);
		this.observable.fire(events.added);
		this.observable.fire(events.changed);
		this.refresh();
	}

	replace(oldData: TDataType, newData: TDataType): void {
		var locationOfOldData: number = this.rawDataSet.indexOf(oldData);

		if (locationOfOldData >= 0) {
			this.array.replace(this.rawDataSet, oldData, newData);
			this.observable.fire(events.replaced);
			this.observable.fire(events.changed);
			this.refresh();
		}
	}
}
