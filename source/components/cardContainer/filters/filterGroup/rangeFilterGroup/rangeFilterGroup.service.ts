import { Observable } from 'rxjs';
import { map, isUndefined } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform;

import { IFilterOption, IFilterGroup, FilterGroup } from '../filterGroup.service';

export interface IRangeFilterGroupSettings<TItemType> {
	label: string;
	type: string;
	getValue: { (item: TItemType): number } | string;
	options: IRangeFilterOptionSettings[];
}

export interface IRangeFilterOptionSettings {
	label: string;
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export interface IRangeFilterOption<TItemType> extends IFilterOption<TItemType> {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export interface IRangeFilterGroup<TItemType> extends IFilterGroup<TItemType> {
	options: IRangeFilterOption<TItemType>[];
	serialize(): Observable<IRangeFilterValue>;
}

export interface IRangeFilterValue {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export class RangeFilterGroup<TItemType> extends FilterGroup<TItemType> implements IRangeFilterGroup<TItemType> {
	private getValue: { (item: any): number } | string;

	transformService: __transform.ITransformService;

	constructor(settings: IRangeFilterGroupSettings<any>
			, transformService: __transform.ITransformService) {
		super(<any>settings);
		this.transformService = transformService;

		this.getValue = settings.getValue;
		settings.options = map<IRangeFilterOptionSettings, IRangeFilterOption<TItemType>>(settings.options, this.buildRangeOption.bind(this));
		this.initOptions();
	}

	serialize(): Observable<IRangeFilterValue> {
		return this.value$.asObservable().map((activeOption: IRangeFilterOption<TItemType>) => {
			if (this.isNullOption(activeOption)) {
				return null;
			}
			return {
				highInclusive: activeOption.highInclusive,
				highExclusive: activeOption.highExclusive,
				lowInclusive: activeOption.lowInclusive,
				lowExclusive: activeOption.lowExclusive,
			};
		});
	}

	private buildRangeOption(option: IRangeFilterOptionSettings): IRangeFilterOption<TItemType> {
		var modeOption: IRangeFilterOption<TItemType> = <any>option;
		modeOption.predicate = (item: TItemType): boolean => {
			var value: number = this.transformService.getValue(item, this.getValue);

			var result: boolean = true;

			if (isUndefined(option.highExclusive) === false) {
				result = value < option.highExclusive;
			} else if (isUndefined(option.highInclusive) === false) {
				result = value <= option.highInclusive;
			}

			if (isUndefined(option.lowExclusive) === false) {
				result = result && value > option.lowExclusive;
			} else if (isUndefined(option.lowInclusive) === false) {
				result = result && value >= option.lowInclusive;
			}

			return result;
		};

		return modeOption;
	}

	private isNullOption(option: IRangeFilterOption<TItemType>): boolean {
		return option.highInclusive == null
			&& option.highExclusive == null
			&& option.lowInclusive == null
			&& option.lowExclusive == null;
	}
}
