import { Observable } from 'rxjs';
import { map, filter, reduce } from 'lodash';

import { IServerSearchParams } from '../asyncTypes';
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

export const defaultThrottleLimit: number = 200;

export function toRequestStream(throttled$: Observable<boolean>, filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>, initial: boolean = false): Observable<IServerSearchParams> {
	let stream = throttled$.switchMap(isThrottled => isThrottled
			? skipIfNotInitial(throttled(filters$, sorts$), initial)
			: skipIfNotInitial(unthrottled(filters$, sorts$), initial));
	if (initial) {
		stream = stream.first();
	}
	return stream;
}

export function skipIfNotInitial(params$: Observable<IServerSearchParams>, initial: boolean): Observable<IServerSearchParams> {
	if (!initial) {
		return params$.skip(1);
	}
	return params$;
}

export function throttled(filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>): Observable<IServerSearchParams> {
	return pipe<Observable<IFilter<any, any>[]>, Observable<any>>(filters$, [
		toFilterChanges,
		filterValues$ => combineWithSortsAndPaging(filterValues$, sorts$),
	]);
}

export function unthrottled(filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>): Observable<IServerSearchParams> {
	return pipe<Observable<IFilter<any, any>[]>, Observable<any>>(filters$, [
		suppressInactiveFilters,
		toFilterChanges,
		filterValues$ => combineWithSortsAndPaging(filterValues$, sorts$.first()),
	]);
}

export function suppressInactiveFilters(filters$: Observable<IFilter<any, any>[]>): Observable<IFilter<any, any>[]> {
	return toFiltersWithValues(filters$)
		.map(filtersWithValues => filter(filtersWithValues, x => !!x.value))
		.map(filtersWithValues => map(filtersWithValues, x => x.filter))
		.first();
}

export function toFiltersWithValues(filters$: Observable<IFilter<any, any>[]>): Observable<IFilterWithValue[]> {
	return filters$.switchMap(filters => Observable.combineLatest(toObservableArray(filters, filter => filter.serialize().map(value => {
		return { filter, value };
	}))));
}

export function toFilterChanges(filters$: Observable<IFilter<any, any>[]>): Observable<{[index: string]: any}> {
	return toTypesWithValues(filters$)
		.map(typeAndValues => filter(typeAndValues, typeAndValue => !!typeAndValue.value))
		.map(typeAndValues => reduce(typeAndValues, (dictionary, typeAndValue) => {
			dictionary[typeAndValue.type] = typeAndValue.value;
			return dictionary;
		}, {}))
		.distinctUntilChanged();
}

export function toTypesWithValues(filters$: Observable<IFilter<any, any>[]>): Observable<ITypeWithValue[]> {
	return filters$.switchMap(filters => Observable.combineLatest(toObservableArray(filters, filter => filter.serialize().map(value => {
		return { type: filter.type, value };
	}))));
}

export function combineWithSortsAndPaging(filterValues$: Observable<{[index: string]: any}>, sorts$: Observable<ISort[]>): Observable<IServerSearchParams> {
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
				paging: {
					pageNumber: 1,
					pageSize: defaultThrottleLimit,
				},
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
