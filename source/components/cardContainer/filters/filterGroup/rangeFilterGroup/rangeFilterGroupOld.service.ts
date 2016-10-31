import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { IFilterOptionOld, IFilterGroupOld, FilterGroupOld } from '../filterGroupOld.service';

export interface IRangeFilterGroupSettingsOld<TItemType> {
	label: string;
	type: string;
	getValue: { (item: TItemType): number } | string;
	options: IRangeFilterOptionSettingsOld[];
}

export interface IRangeFilterOptionSettingsOld {
	label: string;
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export interface IRangeFilterOptionOld extends IFilterOptionOld {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export interface IRangeFilterGroupOld extends IFilterGroupOld {
	options: IRangeFilterOptionOld[];
	serialize(): IRangeFilterValueOld;
}

export interface IRangeFilterValueOld {
	highInclusive?: number;
	highExclusive?: number;
	lowInclusive?: number;
	lowExclusive?: number;
}

export class RangeFilterGroupOld extends FilterGroupOld implements IRangeFilterGroupOld {
	private getValue: { (item: any): number } | string;

	transformService: __transform.ITransformService;

	constructor(settings: IRangeFilterGroupSettingsOld<any>
			, object: __object.IObjectUtility
			, transformService: __transform.ITransformService) {
		super(<any>settings, object);
		this.transformService = transformService;

		this.getValue = settings.getValue;
		settings.options = _.map<IRangeFilterOptionSettingsOld, IRangeFilterOptionOld>(settings.options, this.buildRangeOption.bind(this));
		this.initOptions();
	}

	serialize(): IRangeFilterValueOld {
		let activeOption: IRangeFilterOptionOld = <any>this.activeOption;
		if (this.isNullOption(activeOption)) {
			return null;
		}
		return {
			highInclusive: activeOption.highInclusive,
			highExclusive: activeOption.highExclusive,
			lowInclusive: activeOption.lowInclusive,
			lowExclusive: activeOption.lowExclusive,
		};
	}

	private buildRangeOption(option: IRangeFilterOptionSettingsOld): IRangeFilterOptionOld {
		var modeOption: IRangeFilterOptionOld = <any>option;
		modeOption.filter = (item: any): boolean => {
			var value: number = this.transformService.getValue(item, this.getValue);

			var result: boolean = true;

			if (_.isUndefined(option.highExclusive) === false) {
				result = value < option.highExclusive;
			} else if (_.isUndefined(option.highInclusive) === false) {
				result = value <= option.highInclusive;
			}

			if (_.isUndefined(option.lowExclusive) === false) {
				result = result && value > option.lowExclusive;
			} else if (_.isUndefined(option.lowInclusive) === false) {
				result = result && value >= option.lowInclusive;
			}

			return result;
		};

		return modeOption;
	}

	private isNullOption(option: IRangeFilterOptionOld): boolean {
		return option.highInclusive == null
			&& option.highExclusive == null
			&& option.lowInclusive == null
			&& option.lowExclusive == null;
	}
}
