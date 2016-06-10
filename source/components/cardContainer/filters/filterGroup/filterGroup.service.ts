import * as angular from 'angular';
import * as _ from 'lodash';

import { services, filters, downgrade } from 'typescript-angular-utilities';
import __object = services.object;

export var factoryName: string = 'filterGroup';

export interface IFilterGroupSettings {
	label: string;
	type: string;
	options: IFilterOption[];
	serialize?: {(): any};
}

export interface IFilterOption {
	active?: boolean;
	label: string;
	type?: string;
	value?: any;
	filter<TItemType>(item: TItemType): boolean;
	serialize?: {(): any};
}

interface IConfiguredFilterOption extends IFilterOption {
	count?: number;
}

export interface IFilterGroup extends filters.IFilterWithCounts, filters.ISerializableFilter<any> {
	label: string;
	type: string;
	options: IFilterOption[];
	activeOption: IFilterOption;
	setActiveOption(index: number): void;
	setOptionCounts(counts: number[]): void;
}

export class FilterGroup extends filters.SerializableFilter<any> implements IFilterGroup {
	label: string;
	type: string;
	options: IFilterOption[];
	template: string = '<rl-filter-group filter-group="filter" source="dataSource"></rl-filter-group>';
	private _activeOption: IFilterOption;

	constructor(private settings: IFilterGroupSettings, private object: __object.IObjectUtility) {
		super();
		this.label = settings.label;
		this.type = settings.type != null ? settings.type : settings.label;
		this.initOptions();
	}

	initOptions():void {
		this.options = this.settings.options;
		this.activeOption = this.setDefaultOption();

		_.each(this.options, (option: IFilterOption): void => {
			if (_.isUndefined(option.type)) {
				option.type = option.label;
			}

			option.type = this.object.toString(option.type).toLowerCase();
		});
	}

	get activeOption(): IFilterOption {
		return this._activeOption;
	}

	set activeOption(value: IFilterOption) {
		this._activeOption = value;
		this.onChange(false);
	}

	private setDefaultOption(): IFilterOption {
		let defaultOption: IFilterOption = this.options[0];
		_.each(this.options, (item: IFilterOption): void => {
			if (item.active != null && item.active === true) {
				defaultOption = item;
			}
		});
		return defaultOption;
	}

	filter<TItemType>(item: TItemType): boolean {
		return this.activeOption.filter(item);
	}

	serialize(): any {
		if (_.isFunction(this.settings.serialize)) {
			return this.settings.serialize();
		}

		if (_.isFunction(this.activeOption.serialize)) {
			return this.activeOption.serialize();
		}
		return this.activeOption.value;
	}

	setActiveOption(index: number): void {
		if (index >= 0 && index < this.options.length) {
			this.activeOption = this.options[index];
		}
	}

	setOptionCounts(counts: number[]): void {
		_.each(this.options, (option: IConfiguredFilterOption): void => {
			if (_.has(counts, option.type)) {
				option.count = counts[option.type];
			}
		});
	}

	updateOptionCounts<TDataType>(filteredDataSet: TDataType[]): void {
		_.each(this.options, (option: IConfiguredFilterOption): void => {
			option.count = _.filter(filteredDataSet, option.filter.bind(option)).length;
		});
	}
}

export interface IFilterGroupFactory {
	getInstance(settings: IFilterGroupSettings): IFilterGroup;
}

filterGroupFactory.$inject = [downgrade.objectServiceName];
export function filterGroupFactory(object: __object.IObjectUtility): IFilterGroupFactory {
	'use strict';
	return {
		getInstance(settings: IFilterGroupSettings): IFilterGroup {
			return new FilterGroup(settings, object);
		},
	};
}
