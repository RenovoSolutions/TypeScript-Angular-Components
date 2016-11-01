import { Observable, BehaviorSubject } from 'rxjs';

import { IServerSearchFunction, IServerSearchParams, IDataResult } from '../asyncTypes';
import { IFilter } from '../../filters/index';
import { DataSourceBase } from '../dataSourceBase.service';
import { ISort, SortDirection } from '../../sorts/sort';
import { toRequestStream } from './smartDataActions';

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
		const subscription = this.toRequestStream(this.throttled$, this.filters$, this.sorter.sortList$, true).subscribe(requestData => {
			this.getDataSet(requestData).subscribe(result => {
				subscription.unsubscribe();
				this.resolveReload(result);
				this.toRequestStream(this.throttled$, this.filters$, this.sorter.sortList$)
					.do(() => this.startLoading())
					.debounceTime(defaultDebounce)
					.subscribe(requestData => {
					this.getDataSet(requestData).subscribe(result => {
						this.resolveReload(result);
					});
				});
			});
		});
	}

	get filters(): IFilter<TDataType, any>[] {
		return this.filters$.getValue();
	}

	set filters(value: IFilter<TDataType, any>[]) {
		this.filters$.next(value);
	}

	toRequestStream(throttled$: Observable<boolean>, filters$: Observable<IFilter<any, any>[]>, sorts$: Observable<ISort[]>, initial?: boolean): Observable<IServerSearchParams> {
		return toRequestStream(throttled$, filters$, sorts$, initial);
	}

	startLoading(): void {
		this._rawDataSet.next(null);
		this._loadingDataSet.next(true);
	}

	resolveReload(data: IDataResult<TDataType>): void {
		this.throttled$.next((data.count > data.dataSet.length));
		this._loadingDataSet.next(!data.dataSet);
		this._rawDataSet.next(data.dataSet);

		this.processData();

		this._count.next(data.count);
		this._isEmpty.next(data.isEmpty);
	}
}
