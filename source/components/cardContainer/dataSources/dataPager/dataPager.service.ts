// uses typings/lodash

// /// <reference path='../../../typings/lodash/lodash.d.ts' />

module rl.ui.components.cardContainer.dataSources.dataPager {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.dataSources.dataPager';
	export var factoryName: string = 'dataPager';

	export var defaultPageSize: number = 10;
	
	export interface IDataPager {
		pageNumber: number;
		pageSize: number;
		filter<T>(dataSet: T[]): T[];
	}
	
	export class DataPager implements IDataPager {
		pageNumber: number = 1;
		pageSize: number = defaultPageSize;
	
		filter(dataSet: any[]): any[] {
			var size: number = this.pageSize;
			var start: number = (this.pageNumber - 1) * size;
			return _(dataSet)
				.drop(start)
				.take(size)
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
}
