// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='sortDirection.ts' />
/// <reference path='../column.ts' />

module rl.ui.components.cardContainer.sorts {
	'use strict';

	import __compareResult = rl.utilities.types.compareResult;

	export interface ICompareFunction<TDataType> {
		(a: TDataType, b: TDataType): __compareResult.CompareResult;
	}
	
	export interface ISort {
		column: cardContainer.IColumn;
		direction: SortDirection;
	}
	
	export interface IPartialSort {
		column: string;
		direction: SortDirection;
	}
}
