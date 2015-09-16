// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../sort.ts' />
/// <reference path='../sortDirection.ts' />
/// <reference path='../mergeSort/mergeSort.service.ts' />

module rl.ui.components.cardContainer.sorts.sorter {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.sorts.sorter';
	export var serviceName: string = 'sorter';

	import __compareResult = rl.utilities.types.compareResult;

	export interface ISorter {
		sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[];
	}
	
	export class Sorter implements ISorter {
		static $inject: string[] = [mergeSort.serviceName];
		constructor(private mergeSort: mergeSort.IMergeSort) { }
	
		sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[] {
			if (sort === null) {
				return data;
			}
	
			if (_.isArray(sort)) {
				var reverseSorts: ISort[] = <ISort[]>_.clone(sort);
				reverseSorts.reverse();
	
				return _.reduce(reverseSorts, (sortedData: any[], nextSort: ISort): any[] => {
					return this.singleSort(sortedData, nextSort);
				}, data);
			}
	
			return this.singleSort(data, <ISort>sort);
		}
	
		private singleSort<TDataType>(data: TDataType[], sort: ISort): TDataType[] {
			var compareFunction: ICompareFunction<TDataType> = this.buildSortFunction(sort);
			return this.mergeSort.sort(data, compareFunction);
		}
	
		private buildSortFunction<TDataType>(sort: ISort): ICompareFunction<TDataType> {
			return (a: TDataType, b: TDataType): __compareResult.CompareResult => {
				if (sort.direction === SortDirection.none) {
					return __compareResult.CompareResult.equal;
				}
	
				var valueOfA: any = sort.column.getValue(a);
				var valueOfB: any = sort.column.getValue(b);
	
				var greaterResult: __compareResult.CompareResult = __compareResult.CompareResult.greater;
				var lessResult: __compareResult.CompareResult = __compareResult.CompareResult.less;
	
	
				var descendingSort: boolean = (sort.direction === SortDirection.descending);
				var flip: boolean = sort.column.flipSort;
	
				// Exclusive OR... if flipping a descending sort, you get an ascending sort
				if ((descendingSort || flip) && !(descendingSort && flip)) {
					greaterResult = __compareResult.CompareResult.less;
					lessResult = __compareResult.CompareResult.greater;
				}
	
				return valueOfA > valueOfB
					? greaterResult
					: (valueOfA < valueOfB ? lessResult : __compareResult.CompareResult.equal);
			};
		}
	}
	
	angular.module(moduleName, [])
		.service(serviceName, Sorter);
}
