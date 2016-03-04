'use strict';

import * as angular from 'angular';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __string = services.string;
import __transform = services.transform.transform;

import { IColumn } from '../../column';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.columnSearchFilter';
export var factoryName: string = 'columnSearchFilter';
export var filterName: string = 'column-search';

export interface IColumnSearchFilter extends filters.IFilter {
	searchText: string;
	caseSensitive: boolean;
	column: IColumn<any>;
}

export class ColumnSearchFilter implements IColumnSearchFilter {
	type: string = filterName;
	searchText: string;
	caseSensitive: boolean;
	column: IColumn<any>;

	constructor(private object: __object.IObjectUtility
			, private string: __string.IStringUtilityService) { }

	filter<TItemType>(item: TItemType): boolean {
		if (this.column == null) {
			return true;
		}

		var value: string = this.object.toString(__transform.getValue(item, this.column.getValue));

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
