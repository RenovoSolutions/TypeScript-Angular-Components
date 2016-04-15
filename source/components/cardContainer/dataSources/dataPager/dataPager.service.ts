// /// <reference path='../../../../../typings/lodashTypeExtensions.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';
import * as Rx from 'rx';

export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.dataPager';
export var factoryName: string = 'dataPager';

export var defaultPageSize: number = 10;

export interface IDataPager {
	pageNumber: number;
	pageSize: number;

	pageNumberObservable: Rx.Subject<number>;
	pageSizeObservable: Rx.Subject<number>;

	startItem: number;
	filter<T>(dataSet: T[]): T[];
}

export class DataPager implements IDataPager {
	pageNumber: number = 1;
	pageSize: number = defaultPageSize;

	pageNumberObservable: Rx.Subject<number>;
	pageSizeObservable: Rx.Subject<number>;

	get startItem(): number {
		return (this.pageNumber - 1) * this.pageSize;
	}

	filter(dataSet: any[]): any[] {
		return _(dataSet)
			.drop(this.startItem)
			.take(this.pageSize)
			.value();
	}
}

export interface IDataPagerFactory {
	getInstance(): IDataPager;
}

export function dataPagerFactory(): IDataPagerFactory {
	'use strict';
	return {
		getInstance(): IDataPager {
			return new DataPager();
		},
	};
}

angular.module(moduleName, [])
	.factory(factoryName, dataPagerFactory);
