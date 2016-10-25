import { Observable } from 'rxjs';
import { reduce } from 'lodash';

import { ISort, SortManagerService } from '../../sorts/index';
import { IFilter } from '../../filters/index';
import { IDataPager } from '../../paging/index';

export interface IProcessResult<TDataType> {
	count$: Observable<number>;
	filteredDataSet$: Observable<TDataType[]>;
	dataSet$: Observable<TDataType[]>;
}

export function process<TDataType>(sorter: SortManagerService
								, filters: IFilter<TDataType, any>[]
								, pager: IDataPager
								, data$: Observable<TDataType[]>): IProcessResult<TDataType> {
	const sorted = sort(data$, sorter);
	const filtered = filter(sorted, filters);
	const paged = page(filtered, pager);

	return {
		count$: count(filtered),
		filteredDataSet$: filtered,
		dataSet$: paged,
	};
}

export function count(data$: Observable<any[]>): Observable<number> {
	return data$.map(data => data ? data.length : 0);
}

export function sort<TDataType>(data$: Observable<TDataType[]>, sorter: SortManagerService): Observable<TDataType[]> {
	if (sorter) {
		return sorter.sort(data$);
	}
	return data$;

	// return data$.combineLatest(sorts$)
	// 			.map(([data, sorts]) => {
	// 		if (sorts && sorts.length) {
	// 			return sorter.sort(data, sorts);
	// 		}
	// 		return data;
	// 	});
}

export function filter<TDataType>(data$: Observable<TDataType[]>, filters: IFilter<TDataType, any>[]): Observable<TDataType[]> {
	if (filters && filters.length) {
		return reduce(filters, (filteredData$, filter) => filter.filter(filteredData$), data$);
	}
	return data$;
}

export function page<TDataType>(data$: Observable<TDataType[]>, pager: IDataPager): Observable<TDataType[]> {
	if (pager) {
		return pager.filter(data$);
	}
	return data$;
}
