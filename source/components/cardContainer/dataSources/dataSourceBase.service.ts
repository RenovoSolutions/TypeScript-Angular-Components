'use strict';

import * as Rx from 'rx';

import { services, filters } from 'typescript-angular-utilities';
import __observable = services.observable;
import __array = services.array;
import __object = services.object;

import { IDataSource } from './dataSource';
import { IDataSourceProcessor, IProcessResult } from './dataSourceProcessor.service';
import { ISort } from '../sorts/sort';
import { IDataPager } from './dataPager/dataPager.service';
import * as events from './dataSourceEvents';

export class DataSourceBase<TDataType> implements IDataSource<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[] = [];
	filters: filters.IFilter[] = [];
	pager: IDataPager;
	private _count: number = 0;

	countFilterGroups: boolean = false;

	loadingDataSet: boolean = false;
	private _isEmpty: boolean;

	observable: __observable.IObservableService;
	countObservable: Rx.Subject<number>;

	get count(): number {
		return this._count;
	}

	set count(value: number) {
		this._count = value;
		this.countObservable.onNext(value);
	}

	constructor(observableFactory: __observable.IObservableServiceFactory
			, private dataSourceProcessor: IDataSourceProcessor
			, protected array: __array.IArrayUtility) {
		this.observable = observableFactory.getInstance();
		this.observable.allowableEvents = events.all;
		this.countObservable = new Rx.Subject();
	}

	initPager(): void {
		if (this.pager) {
			this.pager.pageSizeObservable.subscribe(this.onPagingChange.bind(this));
			this.pager.pageNumberObservable.subscribe(this.onPagingChange.bind(this));
		}
	}

	watch<TReturnType>(action: __observable.IAction<TReturnType>, event?: string): __observable.IUnregisterFunction {
		return this.observable.register(action, event);
	}

	get needsRefinedSearch(): boolean {
		let noItemsDisplayed = __object.objectUtility.isNullOrEmpty(this.dataSet);
		let moreItemsOnServer = this._isEmpty === false || (this.rawDataSet != null && this.rawDataSet.length < this.count);
		return noItemsDisplayed && moreItemsOnServer;
	}

	get isEmpty(): boolean {
		return __object.objectUtility.isNullOrEmpty(this.rawDataSet)
			&& (this._isEmpty != null ? this._isEmpty : true);
	}

	set isEmpty(value: boolean) {
		this._isEmpty = value;
	}

	processData(): void {
		var processedData: IProcessResult<TDataType>;

		if (this.countFilterGroups) {
			processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
																			, <filters.IFilterWithCounts[]>this.filters
																			, this.pager
																			, this.rawDataSet);
		} else {
			processedData = this.dataSourceProcessor.process<TDataType>(this.sorts, this.filters, this.pager, this.rawDataSet);
		}
		this.setProcessedData(processedData);
	}
	//used when we need to process data but without client filters.
	processDataNoClientFilters(): void {
		var processedData: IProcessResult<TDataType>;

		if (this.countFilterGroups) {
			processedData = this.dataSourceProcessor.processAndCount<TDataType>(this.sorts
																			, null
																			, this.pager
																			, this.rawDataSet);
		} else {
			processedData = this.dataSourceProcessor.process<TDataType>(this.sorts, null, this.pager, this.rawDataSet);
		}
		this.setProcessedData(processedData);
	}

	setProcessedData( processedData: IProcessResult<TDataType>):void {
		this.count = processedData.count;
		this.dataSet = processedData.dataSet;
		this.filteredDataSet = processedData.filteredDataSet;
	}

	onSortChange(): void {
		if (!this.loadingDataSet) {
			this.filteredDataSet = this.dataSourceProcessor.sort(this.filteredDataSet, this.sorts);
			this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
			this.observable.fire(events.redrawing);
		}
	}

	onPagingChange(): void {
		if (!this.loadingDataSet) {
			this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
			this.observable.fire(events.redrawing);
		}
	}

	refresh(): void {
		if (!this.loadingDataSet) {
			this.processData();
			this.observable.fire(events.redrawing);
		}
	}

	remove(data: TDataType): void {
		var item: TDataType = this.array.remove(this.rawDataSet, data);

		if (item != null) {
			this.observable.fire(events.removed);
			this.observable.fire(events.changed);

			if (this.pager) {
				this.refresh();
			}
		}
	}

	push(data: TDataType): void {
		this.rawDataSet.push(data);
		this.observable.fire(events.added);
		this.observable.fire(events.changed);
		this.refresh();
	}

	replace(oldData: TDataType, newData: TDataType): void {
		var locationOfOldData: number = this.rawDataSet.indexOf(oldData);

		if (locationOfOldData >= 0) {
			this.array.replace(this.rawDataSet, oldData, newData);
			this.observable.fire(events.replaced);
			this.observable.fire(events.changed);
			this.refresh();
		}
	}
}
