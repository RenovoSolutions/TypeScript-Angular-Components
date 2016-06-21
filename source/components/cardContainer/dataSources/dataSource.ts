import { Subject } from 'rxjs';

import { filters } from 'typescript-angular-utilities';

import { ISort } from '../sorts/sort';
import { IDataPager } from '../paging/index';

export interface IDataSource<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[];
	filters: filters.IFilter[];
	pager: IDataPager;
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

	remove(data: TDataType): void;
	push(data: TDataType): void;
	replace(oldData: TDataType, newData: TDataType): void;
}
