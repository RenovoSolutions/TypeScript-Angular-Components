// uses typings/angularjs
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../filterGroup.service.ts' />

module rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.modeFilterGroup';
	export var factoryName: string = 'modeFilterGroup';

	import __object = rl.utilities.services.object;

	export interface IModeFilterGroupSettings {
		label: string;
		type: string;
		getValue<TItemType>(item: TItemType): string | number | boolean;
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
	}
	
	export class ModeFilterGroup extends FilterGroup implements IModeFilterGroup {
		private getValue: {(item: any): string | number | boolean};
	
		constructor(settings: IModeFilterGroupSettings, object: __object.IObjectUtility) {
			this.getValue = settings.getValue;
			settings.options = _.map(settings.options, this.buildModeOption, this);
			super(<any>settings, object);
		}
	
		private buildModeOption(option: IModeFilterOptionSettings): IModeFilterOption {
			var modeOption: IModeFilterOption = <any>option;
			modeOption.filter = (item: boolean | string | number): boolean => {
				if (modeOption.displayAll) {
					return true;
				}
	
				return this.getValue(item) === modeOption.value;
			};
	
			return modeOption;
		}
	}
	
	export interface IModeFilterGroupFactory {
		getInstance(settings: IModeFilterGroupSettings): IModeFilterGroup;
	}
	
	modeFilterGroupFactory.$inject = [__object.serviceName];
	export function modeFilterGroupFactory(object: __object.IObjectUtility): IModeFilterGroupFactory {
		'use strict';
		return {
			getInstance(settings: IModeFilterGroupSettings): IModeFilterGroup {
				return new ModeFilterGroup(settings, object);
			},
		};
	}
	
	angular.module(moduleName, [__object.moduleName])
		.factory(factoryName, modeFilterGroupFactory);
}
