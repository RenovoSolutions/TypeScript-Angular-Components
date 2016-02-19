import { CardContainerController } from './cardContainer';

import { services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { IDataSource, dataPager } from './dataSources/dataSources.module';

export interface ICardContainerService {
	pager: dataPager.IDataPager;
	dataSource: IDataSource<any>;
	numberSelected: number;
	searchFilter: __genericSearchFilter.IGenericSearchFilter;
}

export class CardContainerService {
	pager: dataPager.IDataPager;
	dataSource: IDataSource<any>;
	searchFilter: __genericSearchFilter.IGenericSearchFilter;

	constructor(private cardContainer: CardContainerController) {
		this.pager = cardContainer.builder._pager;
		this.dataSource = cardContainer.dataSource;
		this.searchFilter = cardContainer.searchFilter;
	}

	get numberSelected(): number {
		return this.cardContainer.numberSelected;
	}
}
