import { Observable } from 'rxjs';
import { reduce } from 'lodash';

import { ISort } from '../../sorts/sort';
import { IFilter } from '../../filters/index';
import { IDataPager } from '../../paging/index';
import { Sorter } from '../../sorts/sorter/sorter.service';

export interface IProcessResult<TDataType> {
	count$: Observable<number>;
	filteredDataSet$: Observable<TDataType[]>;
	dataSet$: Observable<TDataType[]>;
}

export function process<TDataType>(sorts$: Observable<ISort[]>
								, filters: IFilter<TDataType, any>[]
								, pager: IDataPager
								, data$: Observable<TDataType[]>
								, sorter: Sorter): IProcessResult<TDataType> {
	const sorted = sort(data$, sorts$, sorter);
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

export function sort<TDataType>(data$: Observable<TDataType[]>, sorts$: Observable<ISort[]>, sorter: Sorter): Observable<TDataType[]> {
	return data$.combineLatest(sorts$)
				.map(([data, sorts]) => {
			if (sorts && sorts.length) {
				return sorter.sort(data, sorts);
			}
			return data;
		});
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
