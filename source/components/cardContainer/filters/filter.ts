import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'lodash';

export interface IFilter<TDataType, TFilterData> {
	serialize(): Observable<TFilterData>;
	filter(data$: Observable<TDataType[]>): Observable<TDataType[]>;
}

export interface IFilterPredicate<TDataType, TFilterData> {
	(item: TDataType, filterData: TFilterData): boolean;
}

export abstract class Filter<TDataType, TFilterData> implements IFilter<TDataType, TFilterData> {
	protected value$: BehaviorSubject<TFilterData>;

	abstract predicate: IFilterPredicate<TDataType, TFilterData>;

	constructor() {
		this.value$ = new BehaviorSubject<TFilterData>(null);
	}

	filter(data$: Observable<TDataType[]>): Observable<TDataType[]> {
		return data$.combineLatest(this.value$)
					.map(([data, filterData]) => filter(data, item => this.predicate(item, filterData)));
	}

	serialize(): Observable<TFilterData> {
		return this.value$.asObservable();
	}
}
