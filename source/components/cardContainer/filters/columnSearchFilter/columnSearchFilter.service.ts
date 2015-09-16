// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../filter.ts' />
/// <reference path='../../column.ts' />

module rl.ui.components.cardContainer.filters.columnSearchFilter {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.filters.columnSearchFilter';
	export var factoryName: string = 'columnSearchFilter';
	export var filterName: string = 'column-search';

	import __object = rl.utilities.services.object;
	import __string = rl.utilities.services.string;

	export interface IColumnSearchFilter extends IFilter {
		searchText: string;
		caseSensitive: boolean;
		column: IColumn;
	}
	
	export class ColumnSearchFilter implements IColumnSearchFilter {
		type: string = filterName;
		searchText: string;
		caseSensitive: boolean;
		column: IColumn;
	
		constructor(private object: __object.IObjectUtility
				, private string: __string.IStringUtilityService) { }
	
		filter<TItemType>(item: TItemType): boolean {
			if (this.column == null) {
				return true;
			}
	
			var value: string = this.object.toString(this.column.getValue(item));
	
			var search: string = this.searchText;
	
			if (!this.caseSensitive) {
				search = search.toLowerCase();
				value = value.toLowerCase();
			}
	
			return this.string.contains(value, search);
		}
	}
	
	export interface IColumnSearchFilterFactory {
		getInstance(): IColumnSearchFilter;
	}
	
	columnSearchFilterFactory.$inject = [__object.serviceName, __string.serviceName];
	export function columnSearchFilterFactory(object: __object.IObjectUtility, string: __string.IStringUtilityService): IColumnSearchFilterFactory {
		'use strict';
		return {
			getInstance(): IColumnSearchFilter {
				return new ColumnSearchFilter(object, string);
			},
		};
	}
	
	angular.module(moduleName, [__object.moduleName, __string.moduleName])
		.factory(factoryName, columnSearchFilterFactory);
}
