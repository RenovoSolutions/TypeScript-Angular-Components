import { Subject, Observable } from 'rxjs';

import { filters } from 'typescript-angular-utilities';

import { ISort } from '../sorts/sort';
import { IFilter } from '../filters/index';
import { IDataPagerOld, IDataPager } from '../paging/index';

export interface IDataSource<TDataType> {
	dataSet$: Observable<TDataType[]>;
	filteredDataSet$: Observable<TDataType[]>;
	rawDataSet$: Observable<TDataType[]>;
	sorts$: Observable<ISort[]>;
	filters: IFilter<TDataType, any>[];
	pager: IDataPager;
	count$: Observable<number>;

	countFilterGroups: boolean;

	loadingDataSet$: Observable<boolean>;
	needsRefinedSearch$: Observable<boolean>;
	isEmpty$: Observable<boolean>;

	clear(): void;

	add(data: TDataType): void;
	remove(data: TDataType): void;
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
