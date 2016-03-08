'use strict';

import * as _ from 'lodash';
import {filters, services} from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

export let factoryName: string = 'rlSelectFilterFactory';

export interface ISelectFilterSettings<TDataType, TFilterType> {
	valueSelector: string | { (item: TDataType): any };
	comparer?: IEqualityFunction<TFilterType>;

	// component settings
	options?: any[];
	getOptions?: { (): angular.IPromise<any[]> };
	label?: string;
	displayNameSelector?: string | { (item: any): string };
	nullOption?: string;
}

export interface ISelectFilter<T> extends filters.IFilter {
	selectedValue: any;
}

export interface IEqualityFunction<TFilterType> {
	(item1: TFilterType, item2: TFilterType): boolean;
}

class SelectFilter<TDataType, TFilterType> implements ISelectFilter<TDataType> {
	selectedValue: any;
	type: string = 'selectFilter';

	private valueSelector: string | { (item: TDataType): any };
	private comparer: IEqualityFunction<TFilterType>;

	// component settings
	options: any[];
	getOptions: { (): angular.IPromise<any[]> };
	label: string;
	displayNameSelector: string | { (item: any): string };
	nullOption: string;
	template: string;

	constructor(settings: ISelectFilterSettings<TDataType, TFilterType>) {
		this.valueSelector = settings.valueSelector;
		this.comparer = settings.comparer;
		this.options = settings.options;
		this.getOptions = settings.getOptions;
		this.label = settings.label;
		this.displayNameSelector = settings.displayNameSelector;
		this.nullOption = settings.nullOption;
		this.template = `<rl-select-filter filter="filter" source="dataSource" options="filter.options" get-options="filter.getOptions()"
										   label="{{filter.label}}" selector="filter.displayNameSelector" null-option="{{filter.nullOption}}"></rl-select-filter>`;
	}

	filter(item: TDataType): boolean {
		if (this.selectedValue == null) {
			return true;
		}

		if (this.comparer != null) {
			return this.comparer(this.getValue(item), this.selectedValue);
		}

		return __object.objectUtility.areEqual(this.getValue(item), this.selectedValue);
	}

	private getValue(item: TDataType): any {
		return __transform.getValue(item, this.valueSelector);
	}

}

export interface ISelectFilterFactory  {
	getInstance<TDataType, TFilterType>(settings: ISelectFilterSettings<TDataType, TFilterType>): ISelectFilter<TDataType>;
}

export function selectFilterFactory(): ISelectFilterFactory {
	return {
		getInstance<TDataType, TFilterType>(settings: ISelectFilterSettings<TDataType, TFilterType>): ISelectFilter<TDataType> {
			return new SelectFilter<TDataType, TFilterType>(settings);
		},
	};
}
