import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { IFilterOptionOld, IFilterGroupOld, FilterGroupOld } from '../filterGroupOld.service';

export interface IModeFilterGroupSettings<TItemType> {
	label: string;
	type: string;
	getValue: { (item: TItemType): string | number | boolean } | string;
	options: IModeFilterOptionSettings[];
}

export interface IModeFilterOptionSettings {
	label: string;
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterOption extends IFilterOptionOld {
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterGroup extends IFilterGroupOld {
	options: IModeFilterOption[];
	serialize(): number | string | boolean;
}

export class ModeFilterGroup extends FilterGroupOld implements IModeFilterGroup {
	private getValue: { (item: any): string | number | boolean } | string;

	transformService: __transform.ITransformService;

	constructor(settings: IModeFilterGroupSettings<any>
			, object: __object.IObjectUtility
			, transformService: __transform.ITransformService) {
		super(<any>settings, object);
		this.transformService = transformService;

		this.getValue = settings.getValue;
		settings.options = _.map<IModeFilterOptionSettings, IModeFilterOption>(settings.options, this.buildModeOption.bind(this));
		this.initOptions();
	}

	serialize(): number | string | boolean {
		const activeOption: IModeFilterOption = <any>this.activeOption;
		if (activeOption.displayAll) {
			return null;
		}
		return activeOption.value;
	}

	private buildModeOption(option: IModeFilterOptionSettings): IModeFilterOption {
		const modeOption: IModeFilterOption = <any>option;
		modeOption.filter = (item: boolean | string | number): boolean => {
			if (modeOption.displayAll) {
				return true;
			}

			return this.transformService.getValue(item, this.getValue) === modeOption.value;
		};

		return modeOption;
	}
}
