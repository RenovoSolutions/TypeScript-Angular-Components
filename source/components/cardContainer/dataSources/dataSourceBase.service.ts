import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { without, map } from 'lodash';

import { IDataSource } from './dataSource';
import { IProcessResult, process } from './processor/dataSourceProcessor';
import { ISort, Sorter } from '../sorts/index';
import { IFilter } from '../filters/index';
import { IDataPager } from '../paging/index';

export class DataSourceBase<TDataType> implements IDataSource<TDataType> {
	sorts$: Observable<ISort[]>;
	filters: IFilter<TDataType, any>[];
	pager: IDataPager;

	countFilterGroups: boolean = false;

	protected _dataSet: BehaviorSubject<TDataType[]>;
	protected _filteredDataSet: BehaviorSubject<TDataType[]>;
	protected _rawDataSet: BehaviorSubject<TDataType[]>;
	protected _count: BehaviorSubject<number>;
	protected _isEmpty: BehaviorSubject<boolean>;
	protected _loadingDataSet: BehaviorSubject<boolean>;
	protected subscription: Subscription;

	sorter: Sorter;

	constructor(sorter: Sorter) {
		this.sorter = sorter;

		this._dataSet = new BehaviorSubject(null);
		this._filteredDataSet = new BehaviorSubject(null);
		this._rawDataSet = new BehaviorSubject(null);
		this._count = new BehaviorSubject(0);
		this._isEmpty = new BehaviorSubject(null);
		this._loadingDataSet = new BehaviorSubject(false);
	}

	get dataSet$(): Observable<TDataType[]> {
		return this._dataSet.asObservable();
	}

	get filteredDataSet$(): Observable<TDataType[]> {
		return this._filteredDataSet.asObservable();
	}

	get rawDataSet$(): Observable<TDataType[]> {
		return this._rawDataSet.asObservable();
	}

	get count$(): Observable<number> {
		return this._count.asObservable();
	}

	get loadingDataSet$(): Observable<boolean> {
		return this._loadingDataSet.asObservable();
	}

	get needsRefinedSearch$(): Observable<boolean> {
		return this.dataSet$.combineLatest(this.rawDataSet$, this.count$, this._isEmpty)
						   .map(([dataSet, rawDataSet, count, isEmpty]) => {
				const noItemsDisplayed = !(dataSet && dataSet.length);
				const moreItemsOnServer = isEmpty === false || (rawDataSet != null && rawDataSet.length < count);
				return noItemsDisplayed && moreItemsOnServer;
			});
	}

	get isEmpty$(): Observable<boolean> {
		return this.rawDataSet$.combineLatest(this._isEmpty)
							   .map(([rawDataSet, isEmpty]) => {
			return !(rawDataSet && rawDataSet.length)
				&& (isEmpty != null ? isEmpty : true);
		});
	}

	init(): void {
		// override with any init logic in children
	}

	clear() {
		this._rawDataSet.next([]);
		this._dataSet.next([]);
		this._filteredDataSet.next([]);
		this._count.next(0);
		this._isEmpty.next(true);
	}

	processData(): void {
		let processedData: IProcessResult<TDataType>;

		// if (this.countFilterGroups) {
			// processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
			// 																, <filters.IFilterWithCounts[]>this.filters
			// 																, this.pager
			// 																, this.rawDataSet);
		// } else {
			processedData = process<TDataType>(this.sorts$, this.filters, this.pager, this.rawDataSet$, this.sorter);
		// }
		this.setProcessedData(processedData);
	}

	//used when we need to process data but without client filters.
	processDataNoClientFilters(): void {
		var processedData: IProcessResult<TDataType>;

		if (this.countFilterGroups) {
			// processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
			// 																, null
			// 																, this.pager
			// 																, this.rawDataSet);
		} else {
			processedData = process<TDataType>(this.sorts$, null, this.pager, this.rawDataSet$, this.sorter);
		}
		this.setProcessedData(processedData);
	}

	setProcessedData(processedData: IProcessResult<TDataType>): void {
		const countSubscription = processedData.count$.subscribe(count => this._count.next(count));
		const dataSetSubscription = processedData.dataSet$.subscribe(dataSet => this._dataSet.next(dataSet));
		const filteredDataSetSubscription = processedData.filteredDataSet$.subscribe(filteredDataSet => this._filteredDataSet.next(filteredDataSet));

		this.subscription = countSubscription.add(dataSetSubscription)
											 .add(filteredDataSetSubscription);
	}

	add(data: TDataType): void {
		const updatedDataSet = [...this._rawDataSet.getValue(), data];
		this._rawDataSet.next(updatedDataSet);
	}

	remove(data: TDataType): void {
		const updatedDataSet = without(this._rawDataSet.getValue(), data);
		this._rawDataSet.next(updatedDataSet);
	}

	replace(oldData: TDataType, newData: TDataType): void {
		const updatedDataSet = map(this._rawDataSet.getValue(), item => {
			return item === oldData
				? newData
				: item;
		});
		this._rawDataSet.next(updatedDataSet);
	}
}
