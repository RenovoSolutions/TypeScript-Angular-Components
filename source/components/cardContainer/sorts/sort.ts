import { types } from 'typescript-angular-utilities';

import { IColumn } from '../column';
import { SortDirection } from './sortDirection';

export * from './sortDirection';

export interface ICompareFunction<TDataType> {
	(a: TDataType, b: TDataType): types.CompareResult;
}

export interface ISort {
	column: IColumn<any>;
	direction: SortDirection;
}

export interface IPartialSort {
	column: string;
	direction: SortDirection;
}
