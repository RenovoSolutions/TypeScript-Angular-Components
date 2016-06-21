import { Injectable, Inject } from '@angular/core';

import { services, filters, downgrade } from 'typescript-angular-utilities';
import __object = services.object;
import __string = services.string;
import __transform = services.transform;

import { IColumn } from '../../column';

export const filterName: string = 'column-search';

@Injectable()
export class ColumnSearchFilter implements filters.IFilter {
	type: string = filterName;
	searchText: string;
	caseSensitive: boolean;
	column: IColumn<any>;

	private object: __object.IObjectUtility;
	private string: __string.IStringUtility;
	private transformService: __transform.ITransformService

	constructor(@Inject(__object.objectToken) object: __object.IObjectUtility
			, @Inject(__string.stringToken) string: __string.IStringUtility
			, @Inject(__transform.transformToken) transformService: __transform.ITransformService) {
		this.object = object;
		this.string = string;
		this.transformService = transformService;
	}

	filter<TItemType>(item: TItemType): boolean {
		if (this.column == null) {
			return true;
		}

		var value: string = this.object.toString(this.transformService.getValue(item, this.column.getValue));

		var search: string = this.searchText;

		if (!this.caseSensitive) {
			search = search.toLowerCase();
			value = value.toLowerCase();
		}

		return this.string.contains(value, search);
	}
}
