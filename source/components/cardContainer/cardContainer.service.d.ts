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
export declare class CardContainerService {
    private cardContainer;
    pager: dataPager.IDataPager;
    dataSource: IDataSource<any>;
    searchFilter: __genericSearchFilter.IGenericSearchFilter;
    constructor(cardContainer: CardContainerController);
    numberSelected: number;
}
