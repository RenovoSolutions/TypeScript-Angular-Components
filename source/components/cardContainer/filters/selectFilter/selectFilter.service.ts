'use strict';

import * as _ from 'lodash';
import {filters, services} from 'typescript-angular-utilities';
import __object = services.object;

export let factoryName: string = 'rlSelectFilterFactory';

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

		return __object.objectUtility.areEqual(this.getValue(item), this.selectedValue);
	}

	private getValue(item: T): any {
		if (_.isFunction(this.valueSelector)) {
			let func = (<{ (item: T): any }>this.valueSelector);
			return(func(item))
		} else {
			let property = <string>this.valueSelector;
			return item[property];
		}
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
