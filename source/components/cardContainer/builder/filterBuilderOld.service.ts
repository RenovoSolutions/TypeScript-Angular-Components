import { Injector, Injectable } from '@angular/core';

import { filters, services } from 'typescript-angular-utilities';
import __object = services.object;
import __date = services.date;
import __string = services.string;
import __transform = services.transform;

import * as cardFilters from '../filters/index';
import { CardContainerBuilderOld } from './cardContainerBuilderOld.service';

export interface IFilterBuilderOld {
	buildFilterGroup(settings: cardFilters.IFilterGroupSettingsOld): cardFilters.IFilterGroupOld;
	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettingsOld<TItemType>): cardFilters.IModeFilterGroupOld;
	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettingsOld<TItemType>): cardFilters.IRangeFilterGroupOld;
	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettingsOld<TDataType, TFilterType>): cardFilters.ISelectFilterOld<TDataType>;
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

	buildFilterGroup(settings: cardFilters.IFilterGroupSettingsOld): cardFilters.IFilterGroupOld {
		let filter: cardFilters.IFilterGroupOld = new cardFilters.FilterGroupOld(settings, this.object);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup<TItemType>(settings: cardFilters.IModeFilterGroupSettingsOld<TItemType>): cardFilters.IModeFilterGroupOld {
		let filter: cardFilters.IModeFilterGroupOld = new cardFilters.ModeFilterGroupOld(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup<TItemType>(settings: cardFilters.IRangeFilterGroupSettingsOld<TItemType>): cardFilters.IRangeFilterGroupOld {
		let filter: cardFilters.IRangeFilterGroupOld = new cardFilters.RangeFilterGroupOld(settings, this.object, this.transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildSelectFilter<TDataType, TFilterType>(settings: cardFilters.ISelectFilterSettingsOld<TDataType, TFilterType>): cardFilters.ISelectFilterOld<TDataType> {
		let filter: cardFilters.ISelectFilterOld<TDataType> = new cardFilters.SelectFilterOld(settings, this.object, this.transformService);
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
