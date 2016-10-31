import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform;

import { IFilterOptionOld, IFilterGroupOld, FilterGroupOld } from '../filterGroupOld.service';

export interface IModeFilterGroupSettingsOld<TItemType> {
	label: string;
	type: string;
	getValue: { (item: TItemType): string | number | boolean } | string;
	options: IModeFilterOptionSettingsOld[];
}

export interface IModeFilterOptionSettingsOld {
	label: string;
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterOptionOld extends IFilterOptionOld {
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterGroupOld extends IFilterGroupOld {
	options: IModeFilterOptionOld[];
	serialize(): number | string | boolean;
}

export class ModeFilterGroupOld extends FilterGroupOld implements IModeFilterGroupOld {
	private getValue: { (item: any): string | number | boolean } | string;

	transformService: __transform.ITransformService;

	constructor(settings: IModeFilterGroupSettingsOld<any>
			, object: __object.IObjectUtility
			, transformService: __transform.ITransformService) {
		super(<any>settings, object);
		this.transformService = transformService;

		this.getValue = settings.getValue;
		settings.options = _.map<IModeFilterOptionSettingsOld, IModeFilterOptionOld>(settings.options, this.buildModeOption.bind(this));
		this.initOptions();
	}

	serialize(): number | string | boolean {
		const activeOption: IModeFilterOptionOld = <any>this.activeOption;
		if (activeOption.displayAll) {
			return null;
		}
		return activeOption.value;
	}

	private buildModeOption(option: IModeFilterOptionSettingsOld): IModeFilterOptionOld {
		const modeOption: IModeFilterOptionOld = <any>option;
		modeOption.filter = (item: boolean | string | number): boolean => {
			if (modeOption.displayAll) {
				return true;
			}

			return this.transformService.getValue(item, this.getValue) === modeOption.value;
		};

		return modeOption;
	}
}
