// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='dataPager/dataPager.service.ts' />
/// <reference path='../filters/filter.ts' />
/// <reference path='../sorts/sort.ts' />

module rl.ui.components.cardContainer.dataSources {
	'use strict';
	
	import __observable = rl.utilities.services.observable;
	
	export interface IDataSource<TDataType> {
		dataSet: TDataType[];
		filteredDataSet: TDataType[];
		rawDataSet: TDataType[];
		sorts: sorts.ISort[];
		filters: { [index: string]: filters.IFilter };
		pager: dataPager.IDataPager;
		count: number;
	
		countFilterGroups: boolean;
	
		loadingDataSet: boolean;
	
		watch<TReturnType>(action: __observable.IAction<TReturnType>, event?: string): __observable.IUnregisterFunction;
		observable: __observable.IObservableService;
	
		processData(): void;
	
		refresh(): void;
		remove(data: TDataType): void;
		push(data: TDataType): void;
		replace(oldData: TDataType, newData: TDataType): void;
	}
}
