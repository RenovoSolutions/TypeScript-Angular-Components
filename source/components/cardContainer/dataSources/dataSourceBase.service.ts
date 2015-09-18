// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='dataSource.ts' />
/// <reference path='dataSourceProcessor.service.ts' />
/// <reference path='dataPager/dataPager.service.ts' />
/// <reference path='../sorts/sort.ts' />

module rl.ui.components.cardContainer.dataSources {
	'use strict';
	
	import __observable = rl.utilities.services.observable;
	import __array = rl.utilities.services.array;
	
	export class DataSourceBase<TDataType> implements IDataSource<TDataType> {
		dataSet: TDataType[];
		filteredDataSet: TDataType[];
		rawDataSet: TDataType[];
		sorts: sorts.ISort[] = [];
		filters: { [index: string]: utilities.filters.IFilter } = {};
		pager: dataPager.IDataPager;
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
																				, <{ [index: string]: utilities.filters.IFilterWithCounts }>this.filters
																				, this.pager
																				, this.rawDataSet);
			} else {
				processedData = this.dataSourceProcessor.process<TDataType>(this.sorts, this.filters, this.pager, this.rawDataSet);
			}
	
			this.count = processedData.count;
			this.dataSet = processedData.dataSet;
			this.filteredDataSet = processedData.filteredDataSet;
		}
	
		refresh: {(): void} = (): void => {
			if (!this.loadingDataSet) {
				this.processData();
				this.observable.fire('redrawing');
			}
		}
	
		remove(data: TDataType): void {
			var item: TDataType = this.array.remove(this.rawDataSet, data);
	
			if (item != null) {
				this.observable.fire('removed');
				this.observable.fire('changed');
	
				if (this.pager) {
					this.refresh();
				}
			}
		}
	
		push(data: TDataType): void {
			this.rawDataSet.push(data);
			this.observable.fire('added');
			this.observable.fire('changed');
			this.refresh();
		}
	
		replace(oldData: TDataType, newData: TDataType): void {
			var locationOfOldData: number = this.rawDataSet.indexOf(oldData);
	
			if (locationOfOldData >= 0) {
				this.array.replace(this.rawDataSet, oldData, newData);
				this.observable.fire('replaced');
				this.observable.fire('changed');
				this.refresh();
			}
		}
	}
}
