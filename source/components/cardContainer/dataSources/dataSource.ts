'use strict';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;

import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';

export interface IDataSource<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[];
	filters: filters.IFilter[];
	pager: IDataPager;
	count: number;

	countFilterGroups: boolean;

	loadingDataSet: boolean;
	needsRefinedSearch: boolean;
	isEmpty: boolean;

	initPager(): void;

	watch<TReturnType>(action: __observable.IAction<TReturnType>, event?: string): __observable.IUnregisterFunction;

	onSortChange(): void;
	onPagingChange(): void;
	refresh(): void;

	remove(data: TDataType): void;
	push(data: TDataType): void;
	replace(oldData: TDataType, newData: TDataType): void;
}
