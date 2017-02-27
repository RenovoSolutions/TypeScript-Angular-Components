import * as _ from 'lodash';
import { ReplaySubject, Observable } from 'rxjs/Rx';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;

export interface IFilterGroupSettingsOld {
	label: string;
	type: string;
	options: IFilterOptionOld[];
	serialize?: {(): any};
}

export interface IFilterOptionOld {
	active?: boolean;
	label: string;
	type?: string;
	value?: any;
	filter<TItemType>(item: TItemType): boolean;
	serialize?: {(): any};
}

interface IConfiguredFilterOption extends IFilterOptionOld {
	count?: number;
}

export interface IFilterGroupOld extends filters.IFilterWithCounts, filters.ISerializableFilter<any> {
	label: string;
	type: string;
	options: IFilterOptionOld[];
	activeOption: IFilterOptionOld;
	changeFromDefault$: ReplaySubject<any>;
	setActiveOption(index: number): void;
	setOptionCounts(counts: number[]): void;
	setActiveOptionByValue(value: number): void;
	setActiveOptionByLabel(label: string): void;
}

export class FilterGroupOld extends filters.SerializableFilter<any> implements IFilterGroupOld {
	label: string;
	type: string;
	options: IFilterOptionOld[];
	template: string = '<rl-filter-group filter-group="filter" source="dataSource"></rl-filter-group>';
	settings: IFilterGroupSettingsOld;

	private _defaultOption: IFilterOptionOld;
	private _activeOption: IFilterOptionOld;
	private _changeFromDefault$: ReplaySubject<any>;

	object: __object.IObjectUtility;

	constructor(settings: IFilterGroupSettingsOld, object: __object.IObjectUtility) {
		super();
		this.object = object;

		this._changeFromDefault$ = new ReplaySubject<any>(1);
		this.settings = settings;
		this.label = settings.label;
		this.type = settings.type != null ? settings.type : settings.label;
		this.initOptions();
	}

	initOptions():void {
		this.options = this.settings.options;
		this._defaultOption = this.setDefaultOption();
		this.activeOption = this._defaultOption;

		_.each(this.options, (option: IFilterOptionOld): void => {
			if (_.isUndefined(option.type)) {
				option.type = option.label;
			}

			option.type = this.object.toString(option.type).toLowerCase();
		});
	}

	get changeFromDefault$(): ReplaySubject<any> {
		return this._changeFromDefault$;
	}

	get activeOption(): IFilterOptionOld {
		return this._activeOption;
	}

	set activeOption(value: IFilterOptionOld) {
		if (this._activeOption == this._defaultOption && value != this._defaultOption) {
			this._changeFromDefault$.next(value);
		}
		this._activeOption = value;
		this.onChange(false);
	}

	private setDefaultOption(): IFilterOptionOld {
		let defaultOption: IFilterOptionOld = this.options[0];
		_.each(this.options, (item: IFilterOptionOld): void => {
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

	setActiveOptionByValue(value: number): void {
		_.each(this.options, (option: IFilterOptionOld): void => {
			if (option.value === value) {
				if (!option.active) {
					this.activeOption = option;
				}
				return;
			}
		});
	}

	setActiveOptionByLabel(label: string): void {
		_.each(this.options, (option: IFilterOptionOld): void => {
			if (option.label === label) {
				if (!option.active) {
					this.activeOption = option;
				}
				return;
			}
		});
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
