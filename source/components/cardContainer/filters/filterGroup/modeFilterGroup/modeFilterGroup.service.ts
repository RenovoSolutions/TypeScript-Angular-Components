import * as angular from 'angular';
import * as _ from 'lodash';

import { services , downgrade} from 'typescript-angular-utilities';
import __object = services.object;
import __transform = services.transform.transform;

import { IFilterOption, IFilterGroup, FilterGroup } from '../filterGroup.service';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup';
export var factoryName: string = 'modeFilterGroup';

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

export interface IModeFilterOption extends IFilterOption {
	displayAll?: boolean;
	value?: number | string | boolean;
}

export interface IModeFilterGroup extends IFilterGroup {
	options: IModeFilterOption[];
	serialize(): number | string | boolean;
}

export class ModeFilterGroup extends FilterGroup implements IModeFilterGroup {
	private getValue: { (item: any): string | number | boolean } | string;

	constructor(settings: IModeFilterGroupSettings<any>, object: __object.IObjectUtility) {
		super(<any>settings, object);
		this.getValue = settings.getValue;
		settings.options = _.map<IModeFilterOptionSettings, IModeFilterOption>(settings.options, this.buildModeOption.bind(this));
		this.initOptions();
	}

	serialize(): number | string | boolean {
		let activeOption: IModeFilterOption = <any>this.activeOption;
		if (activeOption.displayAll) {
			return null;
		}
		return activeOption.value;
	}

	private buildModeOption(option: IModeFilterOptionSettings): IModeFilterOption {
		var modeOption: IModeFilterOption = <any>option;
		modeOption.filter = (item: boolean | string | number): boolean => {
			if (modeOption.displayAll) {
				return true;
			}

			return __transform.getValue(item, this.getValue) === modeOption.value;
		};

		return modeOption;
	}
}

export interface IModeFilterGroupFactory {
	getInstance<TItemType>(settings: IModeFilterGroupSettings<TItemType>): IModeFilterGroup;
}

modeFilterGroupFactory.$inject = [downgrade.objectServiceName];
export function modeFilterGroupFactory(object: __object.IObjectUtility): IModeFilterGroupFactory {
	'use strict';
	return {
		getInstance(settings: IModeFilterGroupSettings<any>): IModeFilterGroup {
			return new ModeFilterGroup(settings, object);
		},
	};
}

angular.module(moduleName, [downgrade.moduleName])
	.factory(factoryName, modeFilterGroupFactory);
