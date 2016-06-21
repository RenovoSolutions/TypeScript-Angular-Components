import * as angular from 'angular';
import * as _ from 'lodash';

import { filters, services, downgrade } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerController } from './cardContainer';
import { IColumn } from './column';
import * as dataSources from './dataSources/dataSources.module';
import * as filterGroup from './filters/filterGroup/filterGroup.module';
import * as selectFilter from './filters/selectFilter/selectFilter.module';
import * as dateFilter from './filters/dateFilter/dateFilter.module';
import { ColumnSearchFilter } from './filters/columnSearchFilter/columnSearchFilter.service';
import { columnSearchFilterName } from '../../componentsDowngrade';

import IDataSource = dataSources.IDataSource;
import IAsyncDataSource = dataSources.IAsyncDataSource;
import IDataSourceDataServiceFunction = dataSources.dataServiceDataSource.IDataServiceFunction;
import IClientServerDataServiceFunction = dataSources.clientServerDataSource.IDataServiceSearchFunction;
import IServerSearchFunction = dataSources.serverSideDataSource.IServerSearchFunction;
import IGetFilterModel = dataSources.clientServerDataSource.IGetFilterModel;
import IValidateFilterModel = dataSources.clientServerDataSource.IValidateFilterModel;
import IFilter = filters.IFilter;
import IGenericSearchFilter = __genericSearchFilter.IGenericSearchFilter;
import IFilterGroup = filterGroup.IFilterGroup;
import IFilterGroupSettings = filterGroup.IFilterGroupSettings;
import IModeFilterGroup = filterGroup.modeFilterGroup.IModeFilterGroup;
import IModeFilterGroupSettings = filterGroup.modeFilterGroup.IModeFilterGroupSettings;
import IRangeFilterGroup = filterGroup.rangeFilterGroup.IRangeFilterGroup;
import IRangeFilterGroupSettings = filterGroup.rangeFilterGroup.IRangeFilterGroupSettings;
import ISelectFilter = selectFilter.ISelectFilter;
import ISelectFilterSettings = selectFilter.ISelectFilterSettings;
import IEqualityFunction = selectFilter.IEqualityFunction;
import IDateFilter = dateFilter.IDateFilter;
import IDateFilterSettings = dateFilter.IDateFilterSettings;
import IDataPager = dataSources.dataPager.IDataPager;

export let factoryName: string = 'cardContainerBuilder';

export {
	IColumn,
	IDataSource,
	IDataSourceDataServiceFunction,
	IDateFilter,
	IDateFilterSettings,
	IClientServerDataServiceFunction,
	IServerSearchFunction,
	IGetFilterModel,
	IValidateFilterModel,
	IFilter,
	IGenericSearchFilter,
	ColumnSearchFilter,
	IFilterGroup,
	IFilterGroupSettings,
	IModeFilterGroup,
	IModeFilterGroupSettings,
	IRangeFilterGroup,
	IRangeFilterGroupSettings,
	ISelectFilter,
	ISelectFilterSettings,
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

	useSearch(tokenized?: boolean): IGenericSearchFilter;
	searchFilter(filter: IGenericSearchFilter): IGenericSearchFilter;
	usePaging(): void;
	addColumn<TItemType>(column: IColumn<TItemType>): void;
	useClickableCards(): void;
	usePermanentFooters(): void;
	useSelection(): void;
	renderFilters(): void;
	saveWhenInvalid(): void;
}

export interface IDataSourceBuilder {
	buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType>;
	buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IAsyncDataSource<TDataType>;
	buildClientServerDataSource<TDataType>(getDataSet: IClientServerDataServiceFunction<TDataType>
											, getFilterModel?: IGetFilterModel<TDataType>
											, validateModel?: IValidateFilterModel<TDataType>): IAsyncDataSource<TDataType>;
	buildServerSideDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
	buildSmartDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
	buildCustomDataSource<TDataType>(dataSource: IDataSource<TDataType>): IDataSource<TDataType>;
}

export interface IFilterBuilder {
	buildFilterGroup(settings: IFilterGroupSettings): IFilterGroup;
	buildModeFilterGroup<TItemType>(settings: IModeFilterGroupSettings<TItemType>): IModeFilterGroup;
	buildRangeFilterGroup<TItemType>(settings: IRangeFilterGroupSettings<TItemType>): IRangeFilterGroup;
	buildSelectFilter<TDataType, TFilterType>(settings: ISelectFilterSettings<TDataType, TFilterType>): ISelectFilter<TDataType>;
	buildDateFilter(valueSelector:IDateFilterSettings):IDateFilter;
	buildColumnSearchFilter(): ColumnSearchFilter;
	addCustomFilter(filter: IFilter): void;

}

export class CardContainerBuilder implements ICardContainerBuilder {
	_dataSource: IDataSource<any>;
	_filters: filters.IFilter[];
	_paging: boolean;
	_columns: IColumn<any>[];
	_clickableCards: boolean;
	_permanentFooters: boolean;
	_selectableCards: boolean;
	_disableSelection: { (item: any): string };
	_searchFilter: IGenericSearchFilter;
	_pager: IDataPager;
	_renderFilters: boolean;
	_saveWhenInvalid: boolean;

	dataSource: IDataSourceBuilder;
	filters: IFilterBuilder;

	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	maxColumnSorts: number;

	constructor(private $injector: angular.auto.IInjectorService) {
		this.dataSource = new DataSourceBuilder($injector, this);
		this.filters = new FilterBuilder($injector, this);
		this._columns = [];
	}

	useSearch(tokenized?: boolean): IGenericSearchFilter {
		let factory: __genericSearchFilter.IGenericSearchFilterFactory = this.$injector.get<any>(downgrade.genericSearchFilterServiceName);
		this._searchFilter = factory.getInstance(tokenized);
		return this._searchFilter;
	}

	searchFilter(filter: IGenericSearchFilter): IGenericSearchFilter {
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

	setCardContainerProperties(cardContainer: CardContainerController): void {
		if (this._searchFilter != null) {
			this._filters.push(this._searchFilter);
		}

		cardContainer.source = this._dataSource;
		cardContainer.filters = this._filters;
		cardContainer.searchFilter = this._searchFilter;
		cardContainer.paging = this._paging;
		cardContainer.columns = this._columns;
		cardContainer.containerData = this.containerData;
		cardContainer.clickableCards = this._clickableCards;
		cardContainer.maxColumnSorts = this.maxColumnSorts;
		cardContainer.permanentFooters = this._permanentFooters;
		cardContainer.selectableCards = this._selectableCards;
		cardContainer.disableSelection = this._disableSelection;
		cardContainer.renderFilters = this._renderFilters;
		cardContainer.saveWhenInvalid = this._saveWhenInvalid;

		if (cardContainer.cardController == null) {
			cardContainer.cardController = this.cardController;
		}
		if (cardContainer.cardControllerAs == null) {
			cardContainer.cardControllerAs = this.cardControllerAs;
		}
		if (cardContainer.cardAs == null) {
			cardContainer.cardAs = this.cardAs;
		}
	}
}

export class DataSourceBuilder implements IDataSourceBuilder {
	constructor(private $injector: angular.auto.IInjectorService
			, private parent: CardContainerBuilder) {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get<any>(dataSources.simpleDataSource.factoryName);
		parent._dataSource = factory.getInstance([]);
	}

	buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType> {
		let factory: dataSources.simpleDataSource.ISimpleDataSourceFactory = this.$injector.get<any>(dataSources.simpleDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(data);
		return this.parent._dataSource;
	}

	buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IAsyncDataSource<TDataType> {
		let factory: dataSources.dataServiceDataSource.IDataServiceDataSourceFactory = this.$injector.get<any>(dataSources.dataServiceDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet);
		return <any>this.parent._dataSource;
	}

	buildClientServerDataSource<TDataType>(getDataSet: IClientServerDataServiceFunction<TDataType>
										, getFilterModel?: IGetFilterModel<TDataType>
										, validateModel?: IValidateFilterModel<TDataType>): IAsyncDataSource<TDataType> {
		if (_.isUndefined(this.parent._searchFilter)) {
			this.parent.useSearch();
		}

		let factory: dataSources.clientServerDataSource.IClientServerDataSourceFactory = this.$injector.get<any>(dataSources.clientServerDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet, this.parent._searchFilter, getFilterModel, validateModel);
		return <any>this.parent._dataSource;
	}

	buildServerSideDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType> {
		let factory: dataSources.serverSideDataSource.IServerSideDataSourceFactory = this.$injector.get<any>(dataSources.serverSideDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet);
		return <any>this.parent._dataSource;
	}

	buildSmartDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType> {
		let factory: dataSources.smartDataSource.ISmartDataSourceFactory = this.$injector.get<any>(dataSources.smartDataSource.factoryName);
		this.parent._dataSource = factory.getInstance(getDataSet);
		return <any>this.parent._dataSource;
	}

	buildCustomDataSource<TDataType>(dataSource: IDataSource<TDataType>): IDataSource<TDataType>{
		this.parent._dataSource = dataSource;
		return this.parent._dataSource;
	}
}

export class FilterBuilder implements IFilterBuilder {
	constructor(private $injector: angular.auto.IInjectorService
			, private parent: CardContainerBuilder) {
		this.parent._filters = [];
	}

	buildFilterGroup(settings: filterGroup.IFilterGroupSettings): filterGroup.IFilterGroup {
		let object: services.object.IObjectUtility = this.$injector.get<any>(downgrade.objectServiceName);
		let filter: filterGroup.IFilterGroup = new filterGroup.FilterGroup(settings, object);
		this.parent._filters.push(filter);
		return filter;
	}

	buildModeFilterGroup<TItemType>(settings: IModeFilterGroupSettings<TItemType>): filterGroup.modeFilterGroup.IModeFilterGroup {
		let object: services.object.IObjectUtility = this.$injector.get<any>(downgrade.objectServiceName);
		let transformService: services.transform.ITransformService = this.$injector.get<any>(downgrade.transformServiceName);
		let filter: filterGroup.modeFilterGroup.IModeFilterGroup = new filterGroup.modeFilterGroup.ModeFilterGroup(settings, object, transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildRangeFilterGroup<TItemType>(settings: IRangeFilterGroupSettings<TItemType>): filterGroup.rangeFilterGroup.IRangeFilterGroup {
		let object: services.object.IObjectUtility = this.$injector.get<any>(downgrade.objectServiceName);
		let transformService: services.transform.ITransformService = this.$injector.get<any>(downgrade.transformServiceName);
		let filter: filterGroup.rangeFilterGroup.IRangeFilterGroup = new filterGroup.rangeFilterGroup.RangeFilterGroup(settings, object, transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildSelectFilter<TDataType, TFilterType>(settings: ISelectFilterSettings<TDataType, TFilterType>): ISelectFilter<TDataType> {
		let object: services.object.IObjectUtility = this.$injector.get<any>(downgrade.objectServiceName);
		let transformService: services.transform.ITransformService = this.$injector.get<any>(downgrade.transformServiceName);
		let filter: ISelectFilter<TDataType> = new selectFilter.SelectFilter(settings, object, transformService);
		this.parent._filters.push(filter);
		return filter;
	}

	buildDateFilter(settings: dateFilter.IDateFilterSettings): IDateFilter {
		let date: services.date.IDateUtility = this.$injector.get<any>(downgrade.dateServiceName);
		let transform: services.transform.ITransformService = this.$injector.get<any>(downgrade.transformServiceName);

		let filter: IDateFilter = new dateFilter.DateFilter(settings, date, transform);
		this.parent._filters.push(filter);
		return filter;
	}

	buildColumnSearchFilter(): ColumnSearchFilter {
		let factory: any = this.$injector.get<any>(columnSearchFilterName);
		let filter: ColumnSearchFilter = factory.getInstance();
		this.parent._filters.push(filter);
		return filter;
	}

	addCustomFilter(filter: filters.IFilter): void {
		this.parent._filters.push(filter);
	}
}

export interface ICardContainerBuilderFactory {
	getInstance(): ICardContainerBuilder;
	useMock: boolean;
	mockBuilder: ICardContainerBuilder;
}

cardContainerBuilderFactory.$inject = ['$injector'];
export function cardContainerBuilderFactory($injector: angular.auto.IInjectorService): ICardContainerBuilderFactory {
	return {
		useMock: false,
		getInstance(): ICardContainerBuilder {
			return this.useMock ? this.mockBuilder : new CardContainerBuilder($injector);
		},
		mockBuilder: new CardContainerBuilder($injector),
	};
}
