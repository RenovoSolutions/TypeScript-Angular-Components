// uses typescript-angular-utilities

// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../sort.ts' />

module rl.ui.components.cardContainer.sorts.mergeSort {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.sorts.mergeSort';
	export var serviceName: string = 'mergeSort';

	import __compareResult = rl.utilities.types.compareResult;

	export interface IMergeSort {
		sort<TDataType>(data: TDataType[], compare?: ICompareFunction<TDataType>): TDataType[];
	}
	
	export class MergeSort implements IMergeSort {
		sort<TDataType>(data: TDataType[], compare?: ICompareFunction<TDataType>): TDataType[] {
			if (data.length < 2) {
				return data;
			}
	
			if (compare == null) {
				compare = this.defaultCompare;
			}
	
			var mid: number;
			var left: any[];
			var right: any[];
	
			mid = data.length / 2;
			left = this.sort(data.slice(0, mid), compare);
			right = this.sort(data.slice(mid, data.length), compare);
	
			return this.merge<TDataType>(left, right, compare);
		}
	
		private defaultCompare<TDataType>(a: TDataType, b: TDataType): __compareResult.CompareResult {
			return a < b
				? __compareResult.CompareResult.less
				: (a > b ? __compareResult.CompareResult.greater : __compareResult.CompareResult.equal);
		}
	
		private merge<TDataType>(left: TDataType[], right: TDataType[], compare: ICompareFunction<TDataType>): TDataType[] {
			var result: TDataType[] = [];
	
			while (left.length && right.length) {
				if (compare(left[0], right[0]) === __compareResult.CompareResult.greater) {
					result.push(right.shift());
				} else {
					// if equal it should preserve same order (stable)
					result.push(left.shift());
				}
			}
	
			if (left.length) {
				result.push.apply(result, left);
			}
	
			if (right.length) {
				result.push.apply(result, right);
			}
	
			return result;
		}
	}
	
	angular.module(moduleName, [])
		.service(serviceName, MergeSort);
}
