import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;
import __object = services.object;
import __genericSearchFilter = services.genericSearchFilter;
import __synchronizedRequests = services.synchronizedRequests;

import { IAsyncDataSource, AsyncDataSource, IDataSetFunction } from '../asyncDataSource.service';
import { IDataSourceProcessor } from '../dataSourceProcessor.service';

export interface IClientServerDataSource<TDataType> extends IAsyncDataSource<TDataType> {
	getFilterModel: IGetFilterModel<any>;
	validateModel: IValidateFilterModel<any>;
}

export interface IDataServiceSearchFunction<TDataType> {
	(search: string | any): Promise<TDataType[]>;
}

export interface IGetFilterModel<TFilterModelType> {
	(): TFilterModelType;
}

export interface IValidateFilterModel<TFilterModelType> {
	(filterModel: TFilterModelType): boolean;
}

export class ClientServerDataSource<TDataType> extends AsyncDataSource<TDataType> {
	private minSearchLength: number = 4;
	private search: string;
	private filterModel: any;

	constructor(getDataSet: IDataServiceSearchFunction<TDataType>
			, private searchFilter: __genericSearchFilter.IGenericSearchFilter
			, public getFilterModel: IGetFilterModel<any>
			, public validateModel: IValidateFilterModel<any>
			, dataSourceProcessor: IDataSourceProcessor
			, array: __array.IArrayUtility
			, private object: __object.IObjectUtility
			, synchronizedRequestsFactory: __synchronizedRequests.ISynchronizedRequestsFactory) {
		super(getDataSet, dataSourceProcessor, array, synchronizedRequestsFactory);

		this.getFilterModel = this.getFilterModel || function(): void { return null; };
		this.validateModel = this.validateModel || function(): boolean { return true; };

		this.countFilterGroups = true;
		this.search = searchFilter.searchText;
		this.filterModel = _.clone(this.getFilterModel());
		searchFilter.minSearchLength = this.minSearchLength;
	}

	refresh(): void {
		if (this.searchFilter.searchText !== this.search
			|| this.filterModelChanged()) {
			this.reload();
		} else {
			super.refresh();
		}
	}

	reload(): void {
		this.search = this.searchFilter.searchText;
		this.filterModel = _.clone(this.getFilterModel());

		let hasValidSearch = !this.object.isNullOrEmpty(this.search) && this.search.length >= this.minSearchLength;
		let hasValidFilterModel = this.filterModel != null && this.validateModel(this.filterModel);

		if (!hasValidSearch && !hasValidFilterModel) {
			this.resolveReload(null);
			return;
		}

		super.reload();
	}

	private filterModelChanged(): boolean {
		return !this.object.areEqual(this.getFilterModel(), this.filterModel);
	}

	protected getParams(): any {
		let searchModel: any = this.getFilterModel();

		if (searchModel != null) {
			searchModel.search = this.search;
		} else {
			searchModel = this.search;
		}

		return searchModel;
	}
}
