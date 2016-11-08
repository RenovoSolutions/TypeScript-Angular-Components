import { Observable, BehaviorSubject } from 'rxjs';

import { IServerSearchFunction, IServerSearchParams, IDataResult } from '../asyncTypes';
import { IFilter } from '../../filters/index';
import { DataSourceBase } from '../dataSourceBase.service';
import { ISort, SortDirection } from '../../sorts/sort';
import { toRequestStream, throttled } from './smartDataActions';

export const defaultDebounce = 1000;

export class SmartDataSource<TDataType> extends DataSourceBase<TDataType> {
	throttled$: BehaviorSubject<boolean>;
	private filters$: BehaviorSubject<IFilter<TDataType, any>[]>;
	getDataSet: IServerSearchFunction<TDataType>;

	constructor(getDataSet: IServerSearchFunction<TDataType>) {
		super();
		this.getDataSet = getDataSet;
		this.filters$ = new BehaviorSubject(null);
		this.throttled$ = new BehaviorSubject(true);
	}

	init(): void {
		// initial request
		this.initialRequest(this.filters$, this.sorter.sortList$).switchMap(requestData => {
			return this.getDataSet(requestData);
		}).switchMap(result => {
			this.resolveReload(result);
			return this.toRequestStream(this.throttled$, this.filters$, this.sorter.sortList$);
		})
			.do(() => this.startLoading())
			.debounceTime(defaultDebounce)
			.switchMap(requestData => {
			return this.getDataSet(requestData);
		}).subscribe(result => {
			this.resolveReload(result);
		});
	}

	get filters(): IFilter<TDataType, any>[] {
		return this.filters$.getValue();
	}

	set filters(value: IFilter<TDataType, any>[]) {
		this.filters$.next(value);
	}

	initialRequest(filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>): Observable<IServerSearchParams> {
		return throttled(filters$, sorts$).take(1);
	}

	toRequestStream(throttled$: Observable<boolean>, filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>): Observable<IServerSearchParams> {
		return toRequestStream(throttled$, filters$, sorts$);
	}

	startLoading(): void {
		this._rawDataSet.next(null);
		this._loadingDataSet.next(true);
	}

	resolveReload(data: IDataResult<TDataType>): void {
		this.throttled$.next(data.dataSet ? (data.count > data.dataSet.length) : true);
		this._loadingDataSet.next(!data.dataSet);
		this._rawDataSet.next(data.dataSet);

		this.processData();

		this._count.next(data.count);
		this._isEmpty.next(data.isEmpty);
	}
}
