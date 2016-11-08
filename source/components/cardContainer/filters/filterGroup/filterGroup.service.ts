import { Observable } from 'rxjs';
import { each, filter, has, isUndefined, isFunction } from 'lodash';

import { IFilter, Filter } from '../filter';

export interface IFilterGroupSettings<TItemType> {
	label: string;
	type: string;
	options: IFilterOption<TItemType>[];
	serialize?: {( activeOption: IFilterOption<TItemType> ): any};
}

export interface IFilterOption<TItemType> {
	active?: boolean;
	label: string;
	type?: string;
	value?: any;
	predicate: { (item: TItemType): boolean };
	serialize?: {(): any};
}

interface IConfiguredFilterOption<TItemType> extends IFilterOption<TItemType> {
	count?: number;
}

export interface IFilterGroup<TItemType> extends IFilter<TItemType, any> {
	label: string;
	type: string;
	options: IFilterOption<TItemType>[];
	activeOption: IFilterOption<TItemType>;
	setActiveOption(index: number): void;
	setOptionCounts(counts: number[]): void;
}

export class FilterGroup<TItemType> extends Filter<TItemType, any> implements IFilterGroup<TItemType> {
	label: string;
	type: string;
	options: IFilterOption<TItemType>[];
	settings: IFilterGroupSettings<TItemType>;

	private _activeOption: IFilterOption<TItemType>;

	constructor(settings: IFilterGroupSettings<TItemType>) {
		super();

		this.settings = settings;
		this.label = settings.label;
		this.type = settings.type != null ? settings.type : settings.label;
		this.initOptions();
	}

	initOptions():void {
		this.options = this.settings.options;
		this.activeOption = this.setDefaultOption();

		each(this.options, (option: IFilterOption<TItemType>): void => {
			if (isUndefined(option.type)) {
				option.type = option.label;
			}

			option.type = (option.type || '').toString().toLowerCase();
		});
	}

	get activeOption(): IFilterOption<TItemType> {
		return this._activeOption;
	}

	set activeOption(value: IFilterOption<TItemType>) {
		this._activeOption = value;
		this.value$.next(value);
	}

	private setDefaultOption(): IFilterOption<TItemType> {
		let defaultOption: IFilterOption<TItemType> = this.options[0];
		each(this.options, (item: IFilterOption<TItemType>): void => {
			if (item.active != null && item.active === true) {
				defaultOption = item;
			}
		});
		return defaultOption;
	}

	predicate = (item: any): boolean => {
		return this.activeOption.predicate(item);
	}

	serialize(): Observable<any> {
		return this.value$.asObservable().map(activeOption => {
			if (isFunction(this.settings.serialize)) {
				return this.settings.serialize(activeOption);
			}

			if (isFunction(activeOption.serialize)) {
				return activeOption.serialize();
			}
			return activeOption.value;
		});
	}

	setActiveOption(index: number): void {
		if (index >= 0 && index < this.options.length) {
			this.activeOption = this.options[index];
		}
	}

	// filter counts not yet supported in the new card container
	setOptionCounts(counts: number[]): void {
		each(this.options, (option: IConfiguredFilterOption<TItemType>): void => {
			if (has(counts, option.type)) {
				option.count = counts[option.type];
			}
		});
	}

	updateOptionCounts<TDataType>(filteredDataSet: TDataType[]): void {
		each(this.options, (option: IConfiguredFilterOption<TItemType>): void => {
			option.count = filter(filteredDataSet, option.predicate.bind(option)).length;
		});
	}
}
