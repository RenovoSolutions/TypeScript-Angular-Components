import { Subject } from 'rxjs';

import { services, filters, downgrade } from 'typescript-angular-utilities';
import __array = services.array;
import __object = services.object;

import { IDataSourceOld } from './dataSource';
import { IDataSourceProcessorOld, IProcessResult } from './processor/dataSourceProcessorOld.service';
import { ISort } from '../sorts/sort';
import { IDataPagerOld } from '../paging/index';

export class DataSourceBaseOld<TDataType> implements IDataSourceOld<TDataType> {
	dataSet: TDataType[];
	filteredDataSet: TDataType[];
	rawDataSet: TDataType[];
	sorts: ISort[] = [];
	filters: filters.IFilter[] = [];
	pager: IDataPagerOld;
	private _count: number = 0;

	countFilterGroups: boolean = false;

	loadingDataSet: boolean = false;
	private _isEmpty: boolean;

	countChanges: Subject<number>;
	redrawing: Subject<void>;
	changed: Subject<void>;
	added: Subject<void>;
	removed: Subject<void>;
	replaced: Subject<void>;

	get count(): number {
		return this._count;
	}

	set count(value: number) {
		this._count = value;
		this.countChanges.next(value);
	}

	constructor(private dataSourceProcessor: IDataSourceProcessorOld
			, protected array: __array.IArrayUtility) {
		this.countChanges = new Subject<number>();
		this.redrawing = new Subject<void>();
		this.changed = new Subject<void>();
		this.added = new Subject<void>();
		this.removed = new Subject<void>();
		this.replaced = new Subject<void>();
	}

	initPager(): void {
		if (this.pager) {
			this.pager.pageSizeChanges.subscribe(this.onPagingChange.bind(this));
			this.pager.pageNumberChanges.subscribe(this.onPagingChange.bind(this));
		}
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

	clear() {
		this.rawDataSet = [];
		this.dataSet = [];
		this.filteredDataSet = [];
		this.count = 0;
		this.isEmpty = true;
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
			this.redrawing.next(null);
		}
	}

	onPagingChange(): void {
		if (!this.loadingDataSet) {
			this.dataSet = this.dataSourceProcessor.page(this.filteredDataSet, this.pager);
			this.redrawing.next(null);
		}
	}

	refresh(): void {
		if (!this.loadingDataSet) {
			this.processData();
			this.redrawing.next(null);
		}
	}

	remove(data: TDataType): void {
		var item: TDataType = this.array.remove(this.rawDataSet, data);

		if (item != null) {
			this.removed.next(null);
			this.changed.next(null);
			this.refresh();
		}
	}

	push(data: TDataType): void {
		this.rawDataSet.push(data);
		this.added.next(null);
		this.changed.next(null);
		this.refresh();
	}

	replace(oldData: TDataType, newData: TDataType): void {
		var locationOfOldData: number = this.rawDataSet.indexOf(oldData);

		if (locationOfOldData >= 0) {
			this.array.replace(this.rawDataSet, oldData, newData);
			this.replaced.next(null);
			this.changed.next(null);
			this.refresh();
		}
	}
}
