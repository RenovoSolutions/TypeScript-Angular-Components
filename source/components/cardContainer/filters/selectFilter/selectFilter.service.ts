'use strict';

import * as _ from 'lodash';
import {filters} from 'typescript-angular-utilities';

export let factoryName: string = 'selectFilter';

export interface ISelectFilter<T> extends filters.IFilter {
	selectedValue: any;
}

class SelectFilter<T> implements ISelectFilter<T> {
	selectedValue: any;
	type: string = 'selectFilter';

	constructor(private valueSelector: string | { (item:T):any }) {}

	filter(item: T): boolean {
		if (this.selectedValue == null) {
			return true;
		}
		
		return this.getValue(item) === this.selectedValue;
	}

	private getValue(item: T):any {
		return (_.isFunction(this.valueSelector)
			? (<{ (item: T): any }>this.valueSelector)(item)
			: item[<string>this.valueSelector]);
	}

}

export interface ISelectFilterFactory  {
	getInstance<T>(valueSelector: string | { (item:T):any }): ISelectFilter<T>;
}

export function selectFilterFactory(): ISelectFilterFactory {
	return {
		getInstance<T>(valueSelector: string | { (item:T):any }): ISelectFilter<T> {
			return new SelectFilter<T>(valueSelector);
		},
	};
}
