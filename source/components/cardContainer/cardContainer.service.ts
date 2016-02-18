import * as _ from 'lodash';

import { CardContainerController } from './cardContainer';

import { filters } from 'typescript-angular-utilities';

import { IDataSource, dataPager } from './dataSources/dataSources.module';

export interface ICardContainerService {
	pager: dataPager.IDataPager;
	dataSource: IDataSource<any>;
	numberSelected: number;
	lookupFilter(type: string): filters.IFilter;
}

export class CardContainerService {
	pager: dataPager.IDataPager;
	dataSource: IDataSource<any>;
	private filters: filters.IFilter[];

	constructor(private cardContainer: CardContainerController) {
		this.pager = cardContainer.pager;
		this.dataSource = cardContainer.dataSource;
		this.filters = cardContainer.filters;
	}

	lookupFilter(type: string): filters.IFilter {
		return _.find(this.filters, (filter: any): boolean => { return filter.type === type; });
	}

	get numberSelected(): number {
		return this.cardContainer.numberSelected;
	}
}
