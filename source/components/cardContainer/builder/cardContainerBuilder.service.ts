import { Injector, Injectable } from '@angular/core';

import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerComponent } from '../cardContainer';
import { CardContainerController } from '../cardContainer.ng1';
import { SelectableCardContainerComponent } from '../selectableCardContainer';
import { IColumn } from '../column';
import * as dataSources from '../dataSources/index';
import * as paging from '../paging/index';

import { IDataSourceBuilder, DataSourceBuilder } from './dataSourceBuilder.service';
import { IFilterBuilder, FilterBuilder } from './filterBuilder.service';

export enum CardContainerType {
	old,
	standard,
	selectable,
}

export interface ICardContainerBuilder {
	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;
	disableSelection: { (item: any): string };

	useSearch(tokenized?: boolean): __genericSearchFilter.IGenericSearchFilter;
	searchFilter(filter: __genericSearchFilter.IGenericSearchFilter): __genericSearchFilter.IGenericSearchFilter;
	usePaging(): void;
	addColumn<TItemType>(column: IColumn<TItemType>): void;
	useClickableCards(): void;
	usePermanentFooters(): void;
	useSelection(): void;
	renderFilters(): void;
	saveWhenInvalid(): void;
}


@Injectable()
export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: dataSources.IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn<any>[];
	_clickableCards: boolean;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: __genericSearchFilter.IGenericSearchFilter;
	_pager: paging.IDataPager;
	_renderFilters: boolean;
	_saveWhenInvalid: boolean;

	dataSource: DataSourceBuilder;
	filters: FilterBuilder;

	maxColumnSorts: number;

	// deprecated
	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;

	private injector: Injector;

	constructor(injector: Injector
			, dataSourceBuilder: DataSourceBuilder
			, filterBuilder: FilterBuilder) {
		this.injector = injector;
		this.dataSource = dataSourceBuilder;
		this.dataSource.init(this);
		this.filters = filterBuilder;
		this.filters.init(this);
		this._columns = [];
	}

	useSearch(tokenized?: boolean): __genericSearchFilter.IGenericSearchFilter {
		let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.injector.get(__genericSearchFilter.genericSearchFilterToken);
		this._searchFilter = factory.getInstance(tokenized);
		return this._searchFilter;
	}

	searchFilter(filter: __genericSearchFilter.IGenericSearchFilter): __genericSearchFilter.IGenericSearchFilter {
		this._searchFilter = filter;
		return this._searchFilter;
	}

	usePaging(): void {
		this._paging = true;
	}

	addColumn<TItemType>(column: IColumn<TItemType>): void {
		this._columns.push(column);
	}

	useClickableCards(): void {
		this._clickableCards = true;
	}

	usePermanentFooters(): void {
		this._permanentFooters = true;
	}

	useSelection(): void {
		this._selectableCards = true;
	}

	renderFilters(): void {
		this._renderFilters = true;
	}

	saveWhenInvalid(): void {
		this._saveWhenInvalid = true;
	}

	set disableSelection(value: { (item: any): string }) {
		if (!this._selectableCards) {
			this.useSelection();
		}

		this._disableSelection = value;
	}

	setCardContainerProperties(cardContainer: CardContainerComponent<any>): void {
		if (this._searchFilter != null) {
			this._filters.push(this._searchFilter);
		}

		cardContainer.dataSource = this._dataSource;
		cardContainer.filters = this._filters;
		cardContainer.searchFilter = this._searchFilter;
		cardContainer.paging = this._paging;
		cardContainer.columns = this._columns;
		cardContainer.clickableCards = this._clickableCards;
		cardContainer.maxColumnSorts = this.maxColumnSorts;
		cardContainer.permanentFooters = this._permanentFooters;
		cardContainer.saveWhenInvalid = this._saveWhenInvalid;

		// cardContainer.renderFilters = this._renderFilters;

		if (cardContainer.type === CardContainerType.selectable) {
			const selectableCardContainer: SelectableCardContainerComponent<any> = <SelectableCardContainerComponent<any>>cardContainer;
			selectableCardContainer.disableSelection = this._disableSelection;
		}

		if (cardContainer.type === CardContainerType.old) {
			const cardContainerOld: CardContainerController = <any>cardContainer;
			cardContainerOld.selectableCards = this._selectableCards;
			cardContainerOld.disableSelection = this._disableSelection;
			cardContainerOld.renderFilters = this._renderFilters;
			cardContainerOld.saveWhenInvalid = this._saveWhenInvalid;

			cardContainerOld.containerData = this.containerData;

			if (cardContainerOld.cardController == null) {
				cardContainerOld.cardController = this.cardController;
			}
			if (cardContainerOld.cardControllerAs == null) {
				cardContainerOld.cardControllerAs = this.cardControllerAs;
			}
			if (cardContainerOld.cardAs == null) {
				cardContainerOld.cardAs = this.cardAs;
			}
		}
	}
}
