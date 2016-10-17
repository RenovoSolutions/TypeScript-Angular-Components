import { Injector, Injectable } from '@angular/core';

import { filters, services } from 'typescript-angular-utilities';
import __object = services.object;
import __date = services.date;
import __string = services.string;
import __transform = services.transform;

import * as cardFilters from '../filters/index';
import { CardContainerBuilderOld } from './cardContainerBuilderOld.service';

export interface IFilterBuilderOld {
	buildFilterGroup(settings: cardFilters.IFilterGroupSettings): cardFilters.IFilterGroup;
	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettings<TItemType>): cardFilters.IModeFilterGroup;
	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettings<TItemType>): cardFilters.IRangeFilterGroup;
	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettings<TDataType, TFilterType>): cardFilters.ISelectFilter<TDataType>;
	buildDateFilter(valueSelector:cardFilters.IDateFilterSettings): cardFilters.IDateFilter;
	buildColumnSearchFilter(): cardFilters.ColumnSearchFilter;
	addCustomFilter(filter: filters.IFilter): void;
}

@Injectable()
export class FilterBuilderOld implements IFilterBuilderOld {
	private injector: Injector;
	private parent: CardContainerBuilderOld;
	private object: __object.ObjectUtility;
	private string: __string.StringUtility;
	private date: __date.DateUtility;
	private transformService: __transform.TransformService;

	constructor(injector: Injector
			, object: __object.ObjectUtility
			, string: __string.StringUtility
			, date: __date.DateUtility
			, transform: __transform.TransformService) {
		this.injector = injector;
		this.object = object;
		this.date = date;
		this.transformService = transform;
	}

	init(parent: CardContainerBuilderOld): void {
		this.parent = parent;

		this.parent._filters = [];
	}

	buildFilterGroup(settings: cardFilters.IFilterGroupSettings): cardFilters.IFilterGroup {
		let filter: cardFilters.IFilterGroup = new cardFilters.FilterGroup(settings, this.object);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettings<TItemType>): cardFilters.IModeFilterGroup {
		let filter: cardFilters.IModeFilterGroup = new cardFilters.ModeFilterGroup(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettings<TItemType>): cardFilters.IRangeFilterGroup {
		let filter: cardFilters.IRangeFilterGroup = new cardFilters.RangeFilterGroup(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettings<TDataType, TFilterType>): cardFilters.ISelectFilter<TDataType> {
		let filter: cardFilters.ISelectFilter<TDataType> = new cardFilters.SelectFilter(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildDateFilter(settings: cardFilters.IDateFilterSettings): cardFilters.IDateFilter {
		let filter: cardFilters.IDateFilter = new cardFilters.DateFilter(settings, this.date, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildColumnSearchFilter(): cardFilters.ColumnSearchFilter {
		let filter: cardFilters.ColumnSearchFilter = new cardFilters.ColumnSearchFilter(this.object, this.string, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	addCustomFilter(filter: filters.IFilter): void {
		this.parent._filters.push(filter);
	}
}
