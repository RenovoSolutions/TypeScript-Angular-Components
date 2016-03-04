'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { types, services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { ISort, ICompareFunction } from '../sort';
import { SortDirection } from '../sortDirection';
import { serviceName as mergeSortServiceName, IMergeSort } from '../mergeSort/mergeSort.service';

export var moduleName: string = 'rl.ui.components.cardContainer.sorts.sorter';
export var serviceName: string = 'sorter';


export interface ISorter {
	sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[];
}

export class Sorter implements ISorter {
	static $inject: string[] = [mergeSortServiceName];
	constructor(private mergeSort: IMergeSort) { }

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
		return (a: TDataType, b: TDataType): types.CompareResult => {
			if (sort.direction === SortDirection.none) {
				return types.CompareResult.equal;
			}

			var valueOfA: any = __transform.transform.getValue(a, sort.column.getValue);
			var valueOfB: any = __transform.transform.getValue(b, sort.column.getValue);

			var greaterResult: types.CompareResult = types.CompareResult.greater;
			var lessResult: types.CompareResult = types.CompareResult.less;


			var descendingSort: boolean = (sort.direction === SortDirection.descending);
			var flip: boolean = sort.column.flipSort;

			// Exclusive OR... if flipping a descending sort, you get an ascending sort
			if ((descendingSort || flip) && !(descendingSort && flip)) {
				greaterResult = types.CompareResult.less;
				lessResult = types.CompareResult.greater;
			}

			return valueOfA > valueOfB
				? greaterResult
				: (valueOfA < valueOfB ? lessResult : types.CompareResult.equal);
		};
	}
}

angular.module(moduleName, [])
	.service(serviceName, Sorter);
