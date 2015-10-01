import { CardContainerController } from './cardContainer';
import { filters } from 'typescript-angular-utilities';
import { IDataSource, dataPager } from './dataSources/dataSources.module';
export interface ICardContainerService {
    pager: dataPager.IDataPager;
    dataSource: IDataSource<any>;
    numberSelected: number;
    lookupFilter(type: string): filters.IFilter;
}
export declare class CardContainerService {
    private cardContainer;
    pager: dataPager.IDataPager;
    dataSource: IDataSource<any>;
    private filters;
    constructor(cardContainer: CardContainerController);
    lookupFilter(type: string): filters.IFilter;
    numberSelected: number;
}
