import { Observable } from 'rxjs';

export interface IServerSearchFunction<TDataType> {
	(searchParams: IServerSearchParams): Promise<IDataResult<TDataType>> | Observable<IDataResult<TDataType>>;
}

export interface IServerSearchParams {
	filters: {[index: string]: any};
	sorts: ISortParams[];
	paging: IPagingParams;
}

export interface ISortParams {
	column: string;
	direction: string;
}

export interface IPagingParams {
	pageNumber: number;
	pageSize: number;
}

export interface IDataResult<TDataType> {
	dataSet: TDataType[];
	count: number;
	isEmpty?: boolean;
}