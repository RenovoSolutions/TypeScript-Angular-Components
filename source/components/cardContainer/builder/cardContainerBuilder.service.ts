import { Injector, Injectable } from '@angular/core';

import { IColumn } from '../column';
import { IDataSource, SimpleDataSource } from '../dataSources/index';
import { Sorter } from '../sorts/index';
import { IFilter } from '../filters/index';
import {} from '../paging/index';

export enum CardContainerType {
	standard,
	selectable,
}

export interface ICardContainerProperties {
	search?: boolean;
	paging?: boolean;
	maxColumnSorts?: number;
	permanentFooters?: boolean;
	disableSelection?: { (item: any): string };
}

export interface ICardContainerInstance { }

export interface ICardContainerConstructor<TDataType> {
	search?: boolean;
	paging?: boolean;
	maxColumnSorts?: number;
	permanentFooters?: boolean;
	disableSelection?: { (item: any): string };
	columns: IColumn<TDataType>[];
	dataSource: IDataSource<TDataType>;
	filters: IFilter<TDataType, any>[];
}

@Injectable()
export class CardContainerBuilderService {
	private injector: Injector;

	constructor(injector: Injector) {
		this.injector = injector;
	}

	getInstance(settings: ICardContainerProperties): ICardContainerInstance {
		return <any>{
			search: settings.search,
			paging: settings.paging,
			maxColumnSorts: settings.maxColumnSorts,
			permanentFooters: settings.permanentFooters,
			disableSelection: settings.disableSelection,
			columns: [],
			filters: [],
		};
	}

	addColumn<TItemType>(container: ICardContainerInstance, column: IColumn<TItemType>): void {
		(container as ICardContainerConstructor<TItemType>).columns.push(column);
	}

	buildSimpleDataSource<TDataType>(container: ICardContainerInstance, data: TDataType[]): IDataSource<TDataType> {
		const sorter: Sorter = this.injector.get(Sorter);
		const dataSource = new SimpleDataSource(data, sorter);
		(container as ICardContainerConstructor<TDataType>).dataSource = dataSource;
		return dataSource;
	}
}
