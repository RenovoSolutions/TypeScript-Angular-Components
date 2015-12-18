'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;

export var factoryName: string = 'filterGroup';

export interface IFilterGroupSettings {
	label: string;
	type: string;
	options: IFilterOption[];
}

export interface IFilterOption {
	label: string;
	count?: number;
	type?: string;
	filter<TItemType>(item: TItemType): boolean;
}

export interface IFilterGroup extends filters.IFilterWithCounts {
	label: string;
	type: string;
	options: IFilterOption[];
	activeOption: IFilterOption;
	setActiveOption(index: number): void;
	setOptionCounts(counts: number[]): void;
}

export class FilterGroup implements IFilterGroup {
	label: string;
	type: string;
	options: IFilterOption[];
	activeOption: IFilterOption;

	constructor(settings: IFilterGroupSettings, object: __object.IObjectUtility) {
		this.label = settings.label;
		this.type = settings.type != null ? settings.type : settings.label;
		this.options = settings.options;
		this.activeOption = this.options[0];

		_.each(this.options, (option: IFilterOption): void => {
			if (_.isUndefined(option.type)) {
				option.type = option.label;
			}

			option.type = object.toString(option.type).toLowerCase();
		});
	}

	filter<TItemType>(item: TItemType): boolean {
		return this.activeOption.filter(item);
	}

	setActiveOption(index: number): void {
		if (index >= 0 && index < this.options.length) {
			this.activeOption = this.options[index];
		}
	}

	setOptionCounts(counts: number[]): void {
		_.each(this.options, (option: IFilterOption): void => {
			if (_.has(counts, option.type)) {
				option.count = counts[option.type];
			}
		});
	}

	updateOptionCounts<TDataType>(filteredDataSet: TDataType[]): void {
		_.each(this.options, (option: IFilterOption): void => {
			option.count = _.filter(filteredDataSet, option.filter, option).length;
		});
	}
}

export interface IFilterGroupFactory {
	getInstance(settings: IFilterGroupSettings): IFilterGroup;
}

filterGroupFactory.$inject = [__object.serviceName];
export function filterGroupFactory(object: __object.IObjectUtility): IFilterGroupFactory {
	'use strict';
	return {
		getInstance(settings: IFilterGroupSettings): IFilterGroup {
			return new FilterGroup(settings, object);
		},
	};
}
