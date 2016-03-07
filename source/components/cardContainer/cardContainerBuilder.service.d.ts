import * as angular from 'angular';
import { filters, services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;
import { CardContainerController } from './cardContainer';
import { IColumn } from './column';
import * as dataSources from './dataSources/dataSources.module';
import * as filterGroup from './filters/filterGroup/filterGroup.module';
import * as selectFilter from './filters/selectFilter/selectFilter.module';
import * as dateFilter from './filters/dateFilter/dateFilter.module';
import { IColumnSearchFilter } from './filters/columnSearchFilter/columnSearchFilter.service';
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
import IEqualityFunction = selectFilter.IEqualityFunction;
import IDateFilter = dateFilter.IDateFilter;
import IDateFilterSettings = dateFilter.IDateFilterSettings;
import IDataPager = dataSources.dataPager.IDataPager;
export declare let factoryName: string;
export { IColumn, IDataSource, IDataSourceDataServiceFunction, IDateFilter, IDateFilterSettings, IClientServerDataServiceFunction, IServerSearchFunction, IGetFilterModel, IValidateFilterModel, IFilter, IGenericSearchFilter, IColumnSearchFilter, IFilterGroup, IFilterGroupSettings, IModeFilterGroup, IModeFilterGroupSettings, IRangeFilterGroup, IRangeFilterGroupSettings, ISelectFilter };
export interface ICardContainerBuilder {
    dataSource: IDataSourceBuilder;
    filters: IFilterBuilder;
    containerData: any;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
    maxColumnSorts: number;
    disableSelection: {
        (item: any): string;
    };
    useSearch(): IGenericSearchFilter;
    usePaging(): void;
    addColumn(column: IColumn): void;
    useClickableCards(): void;
    usePermanentFooters(): void;
    useSelection(): void;
    renderFilters(): void;
}
export interface IDataSourceBuilder {
    buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType>;
    buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildClientServerDataSource<TDataType>(getDataSet: IClientServerDataServiceFunction<TDataType>, getFilterModel?: IGetFilterModel<TDataType>, validateModel?: IValidateFilterModel<TDataType>): IAsyncDataSource<TDataType>;
    buildServerSideDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildSmartDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildCustomDataSource<TDataType>(dataSource: IDataSource<TDataType>): IDataSource<TDataType>;
}
export interface IFilterBuilder {
    buildFilterGroup(settings: IFilterGroupSettings): IFilterGroup;
    buildModeFilterGroup(settings: IModeFilterGroupSettings): IModeFilterGroup;
    buildRangeFilterGroup(settings: IRangeFilterGroupSettings): IRangeFilterGroup;
    buildSelectFilter<TDataType, TFilterType>(valueSelector: string | {
        (item: TDataType): any;
    }, comparer?: IEqualityFunction<TFilterType>): ISelectFilter<TDataType>;
    buildDateFilter(valueSelector: IDateFilterSettings): IDateFilter;
    buildColumnSearchFilter(): IColumnSearchFilter;
    addCustomFilter(filter: IFilter): void;
}
export declare class CardContainerBuilder implements ICardContainerBuilder {
    private $injector;
    _dataSource: IDataSource<any>;
    _filters: filters.IFilter[];
    _paging: boolean;
    _columns: IColumn[];
    _clickableCards: boolean;
    _permanentFooters: boolean;
    _selectableCards: boolean;
    _disableSelection: {
        (item: any): string;
    };
    _searchFilter: IGenericSearchFilter;
    _pager: IDataPager;
    _renderFilters: boolean;
    dataSource: IDataSourceBuilder;
    filters: IFilterBuilder;
    containerData: any;
    cardController: string;
    cardControllerAs: string;
    cardAs: string;
    maxColumnSorts: number;
    constructor($injector: angular.auto.IInjectorService);
    useSearch(filter?: IGenericSearchFilter): IGenericSearchFilter;
    usePaging(): void;
    addColumn(column: IColumn): void;
    useClickableCards(): void;
    usePermanentFooters(): void;
    useSelection(): void;
    renderFilters(): void;
    disableSelection: {
        (item: any): string;
    };
    setCardContainerProperties(cardContainer: CardContainerController): void;
}
export declare class DataSourceBuilder implements IDataSourceBuilder {
    private $injector;
    private parent;
    constructor($injector: angular.auto.IInjectorService, parent: CardContainerBuilder);
    buildSimpleDataSource<TDataType>(data: TDataType[]): IDataSource<TDataType>;
    buildDataServiceDataSource<TDataType>(getDataSet: IDataSourceDataServiceFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildClientServerDataSource<TDataType>(getDataSet: IClientServerDataServiceFunction<TDataType>, getFilterModel?: IGetFilterModel<TDataType>, validateModel?: IValidateFilterModel<TDataType>): IAsyncDataSource<TDataType>;
    buildServerSideDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildSmartDataSource<TDataType>(getDataSet: IServerSearchFunction<TDataType>): IAsyncDataSource<TDataType>;
    buildCustomDataSource<TDataType>(dataSource: IDataSource<TDataType>): IDataSource<TDataType>;
}
export declare class FilterBuilder implements IFilterBuilder {
    private $injector;
    private parent;
    constructor($injector: angular.auto.IInjectorService, parent: CardContainerBuilder);
    buildFilterGroup(settings: filterGroup.IFilterGroupSettings): filterGroup.IFilterGroup;
    buildModeFilterGroup(settings: filterGroup.modeFilterGroup.IModeFilterGroupSettings): filterGroup.modeFilterGroup.IModeFilterGroup;
    buildRangeFilterGroup(settings: filterGroup.rangeFilterGroup.IRangeFilterGroupSettings): filterGroup.rangeFilterGroup.IRangeFilterGroup;
    buildSelectFilter<TDataType, TFilterType>(valueSelector: string | {
        (item: TDataType): any;
    }, comparer?: IEqualityFunction<TFilterType>): ISelectFilter<TDataType>;
    buildDateFilter(settings: dateFilter.IDateFilterSettings): IDateFilter;
    buildColumnSearchFilter(): IColumnSearchFilter;
    addCustomFilter(filter: filters.IFilter): void;
}
export interface ICardContainerBuilderFactory {
    getInstance(): ICardContainerBuilder;
    useMock: boolean;
    mockBuilder: ICardContainerBuilder;
}
export declare function cardContainerBuilderFactory($injector: angular.auto.IInjectorService): ICardContainerBuilderFactory;
