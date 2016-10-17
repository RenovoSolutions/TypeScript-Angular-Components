import * as _ from 'lodash';
import * as Rx from 'rxjs';

import { services, filters, downgrade } from 'typescript-angular-utilities';
import __array = services.array;
import __object = services.object;

import { IServerSearchFunction, IServerSearchParams, ISortParams, IPagingParams, IDataResult } from '../asyncTypes';
import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessorOld } from '../processor/dataSourceProcessorOld.service';
import { ISort, SortDirection } from '../../sorts/sort';

export interface ISmartDataSource<TDataType> extends IAsyncDataSource<TDataType> {
	filters: filters.ISerializableFilter<any>[];
}

export class SmartDataSource<TDataType> extends AsyncDataSource<TDataType> {
	throttled: boolean = true;
	appliedFilters: { [index: string]: any };
	private _filters: filters.IFilter[];
	private subscriptions: Rx.Subscription[];
	private throttleLimit: number = 200;

	constructor(getDataSet: IServerSearchFunction<TDataType>
			, dataSourceProcessor: IDataSourceProcessorOld
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility) {
		super(<any>getDataSet, dataSourceProcessor, array);
	}

	get filters(): filters.IFilter[] {
		return this._filters;
	}

	set filters(value: filters.IFilter[]) {
		this._filters = value;
		this.setupSubscriptions();
	}

	onSortChange(): void {
		if (this.throttled) {
			this.reload();
		} else {
			super.onSortChange();
		}
	}

	refresh(): void {
		if (this.throttled) {
			this.reload();
		} else {
			super.refresh();
		}
	}

	protected getParams(): IServerSearchParams {
		this.updateAppliedFilters();
		return {
			filters: this.appliedFilters,
			sorts: _.map(this.sorts, (sort: ISort): ISortParams => {
				return {
					column: sort.column.label,
					direction: SortDirection.getFullName(sort.direction),
				};
			}),
			paging: {
				pageNumber: 1,
				pageSize: this.throttleLimit,
			},
		};
	}

	private updateAppliedFilters(): void {
		let filterDictionary: { [index: string]: filters.IFilter } = this.array.toDictionary(this.filters, (filter: filters.ISerializableFilter<any>): string => {
			return filter.type;
		});
		this.appliedFilters = _.mapValues(filterDictionary, (filter: filters.ISerializableFilter<any>): any => {
			if (_.isFunction(filter.serialize)) {
				return filter.serialize();
			}
			return null;
		});
		this.appliedFilters = _.omitBy(this.appliedFilters, (value: any): boolean => { return value == null; });
	}

	private setupSubscriptions() {
		_.each(this.subscriptions, (subscription: Rx.Subscription): void => {
			subscription.unsubscribe();
		});
		this.subscriptions = [];
		_.each(this.filters, (filter: filters.ISerializableFilter<any>): void => {
			if (_.isFunction(filter.subscribe)) {
				this.subscriptions.push(<any>filter.subscribe((): void => { this.onFilterChange(filter); }));
			}
		});
	}

	private onFilterChange(filter: filters.ISerializableFilter<any>): void {
		if (_.has(this.appliedFilters, filter.type)) {
			this.reload();
		}
	}

	protected resolveReload(result: any): void {
		let data: IDataResult<TDataType> = <IDataResult<TDataType>>result;
		this.throttled = (data.count > data.dataSet.length);
		super.resolveReload(data.dataSet);
		this.count = data.count;
		this.isEmpty = data.isEmpty;
	}
}
