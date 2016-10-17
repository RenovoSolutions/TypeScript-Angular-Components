import { Subject, Observable } from 'rxjs';

import { filters } from 'typescript-angular-utilities';

import { ISort } from '../sorts/sort';
import { IDataPagerOld } from '../paging/index';

export interface IDataSource<TDataType> {
	dataSet: Observable<TDataType[]>;
	filteredDataSet: Observable<TDataType[]>;
	rawDataSet: Observable<TDataType[]>;
	// sorts: ISort[];
	// filters: filters.IFilter[];
	// pager: IDataPager;
	count: Observable<number>;

	redrawing: Observable<void>;
	changed: Observable<void>;
	added: Observable<void>;
	removed: Observable<void>;
	replaced: Observable<void>;

	countFilterGroups: boolean;

	loadingDataSet: boolean;
	needsRefinedSearch: boolean;
	isEmpty: boolean;

	initPager(): void;

	onSortChange(): void;
	onPagingChange(): void;
	refresh(): void;
	clear(): void;

	remove(data: TDataType): void;
	push(data: TDataType): void;
	replace(oldData: TDataType, newData: TDataType): void;
}

export interface IDataSourceOld<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[];
	filters: filters.IFilter[];
	pager: IDataPagerOld;
	count: number;

	countChanges: Subject<number>,
	redrawing: Subject<void>;
	changed: Subject<void>;
	added: Subject<void>;
	removed: Subject<void>;
	replaced: Subject<void>;

	countFilterGroups: boolean;

	loadingDataSet: boolean;
	needsRefinedSearch: boolean;
	isEmpty: boolean;

	initPager(): void;

	onSortChange(): void;
	onPagingChange(): void;
	refresh(): void;
	clear(): void;

	remove(data: TDataType): void;
	push(data: TDataType): void;
	replace(oldData: TDataType, newData: TDataType): void;
}
