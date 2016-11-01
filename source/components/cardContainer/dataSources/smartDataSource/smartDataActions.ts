import { Observable } from 'rxjs';
import { map, filter, reduce } from 'lodash';

import { IFilter } from '../../filters/index';
import { ISort, SortDirection } from '../../sorts/index';

export interface IFilterWithValue {
	filter: IFilter<any, any>;
	value: any;
}

export interface ITypeWithValue {
	type: string;
	value: any;
}

export function process(throttled$: Observable<boolean>, filters: IFilter<any, any>[]) {
	return throttled$.switchMap(isThrottled => isThrottled ? throttled(filters) : unthrottled(filters));
}

export function throttled(filters: IFilter<any, any>[]): Observable<any> {
	return null;
}

export function unthrottled(filters: IFilter<any, any>[]): any {
	return pipe<IFilter<any, any>[], Observable<any>>(filters, [
		toFiltersWithValues,
		suppressInactiveFilters,
		toTypesWithValues,
		toActiveFilterChanges,
	]);
}

export function toFiltersWithValues(filters: IFilter<any, any>[]): Observable<IFilterWithValue[]> {
	return Observable.combineLatest(toObservableArray(filters, filter => filter.serialize().map(value => {
		return { filter, value };
	})));
}

export function suppressInactiveFilters(filtersWithValues$: Observable<IFilterWithValue[]>): Observable<IFilter<any, any>[]> {
	return filtersWithValues$
		.map(filtersWithValues => filter(filtersWithValues, x => !!x.value))
		.map(filtersWithValues => map(filtersWithValues, x => x.filter))
		.first();
}

export function toTypesWithValues(filters$: Observable<IFilter<any, any>[]>): Observable<ITypeWithValue[]> {
	return filters$.switchMap(filters => Observable.combineLatest(toObservableArray(filters, filter => filter.serialize().map(value => {
		return { type: filter.type, value };
	}))));
}

export function toActiveFilterChanges(filterTypesWithValues$: Observable<ITypeWithValue[]>): Observable<any> {
	return filterTypesWithValues$
		.map(typeAndValues => reduce(typeAndValues, (dictionary, typeAndValue) => {
			dictionary[typeAndValue.type] = typeAndValue.value;
			return dictionary;
		}, {}))
		.distinctUntilChanged();
}

export function combineWithSorts(filterValues$: Observable<any>, sorts$: Observable<ISort[]>): Observable<any> {
	return Observable.combineLatest(filterValues$, sorts$)
		.map(([filterValues, sorts]) => {
			return {
				filters: filterValues,
				sorts: map(sorts, sort => {
					return {
						column: sort.column.label,
						direction: SortDirection.getFullName(sort.direction),
					};
				}),
			};
		});
}

// these two could become reusable utility functions
export function toObservableArray<TListType, TReturnType>(list: TListType[], transform: { (item: TListType): Observable<TReturnType> }): Observable<TReturnType>[] {
	return map(list, (item: TListType) => {
		return transform(item);
	});
}

export function pipe<TInputType, TReturnType>(input: TInputType, actions: { (input: any): any }[]): TReturnType {
	return <any>reduce(actions, (data, action) => action(data), input);
}
