import { Injectable, Inject } from '@angular/core';
import * as _ from 'lodash';

import { types, services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { ISort, ICompareFunction } from '../sort';
import { SortDirection } from '../sortDirection';
import { MergeSort, IMergeSort } from '../mergeSort/mergeSort.service';

export interface ISorter {
	sort<TDataType>(data: TDataType[], sort: ISort | ISort[]): TDataType[];
}

@Injectable()
export class Sorter implements ISorter {
	mergeSort: IMergeSort;

	transformService: __transform.ITransformService;

	constructor(mergeSort: MergeSort
			, @Inject(__transform.transformToken) transformService: __transform.ITransformService) {
		this.mergeSort = mergeSort;
		this.transformService = transformService;
	}

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

			var valueOfA: any = this.transformService.getValue(a, sort.column.getValue);
			var valueOfB: any = this.transformService.getValue(b, sort.column.getValue);

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
