import { Observable } from 'rxjs';
import { reduce, filter } from 'lodash';

import { filters } from 'typescript-angular-utilities';
import IFilter = filters.IFilter;

import { ISort } from '../../sorts/sort';
import { IDataPager } from '../../paging/index';
import { Sorter } from '../../sorts/sorter/sorter.service';

export interface IProcessResult<TDataType> {
	count: Observable<number>;
	filteredDataSet: Observable<TDataType[]>;
	dataSet: Observable<TDataType[]>;
}

export interface IWrappedItem<TItemType> {
	data: TItemType;
	filterData: any; //*filterData
}

// export function process<TDataType>(sorts$: Observable<ISort[]>
// 								, filters: IFilter[]
// 								, pager: IDataPager
// 								, data$: Observable<TDataType[]>
// 								, sorter: Sorter): IProcessResult<TDataType> {
// 	let processedData: Observable<TDataType[]> = data$;

// 	processedData = sort(processedData, sorts$, sorter);

// 	if (this.object.isNullOrEmpty(filters) === false) {
// 		processedData = reduce(filters, (filteredData: TDataType[], filter: IFilter): TDataType[] => {
// 			// Filter the data set using the filter function on the filter
// 			return filter(filteredData, filter.filter.bind(filter));
// 		}, processedData);
// 	}

// 	var result: IProcessResult<TDataType> = {
// 		count: (processedData != null ? processedData.length : 0),
// 		filteredDataSet: processedData,
// 		dataSet: processedData,
// 	};

// 	result.dataSet = this.page(processedData, pager);
// 	return result;
// }

export function sort<TDataType>(data$: Observable<TDataType[]>, sorts$: Observable<ISort[]>, sorter: Sorter): Observable<TDataType[]> {
	return data$.combineLatest(sorts$)
				.map(([data, sorts]) => {
			if (sorts && sorts.length) {
				return sorter.sort(data, sorts);
			}
			return data;
		});
}

export function page<TDataType>(data$: Observable<TDataType[]>, pager: IDataPager): Observable<TDataType[]> {
	if (pager) {
		return pager.filter(data$);
	}
	return data$;
}
