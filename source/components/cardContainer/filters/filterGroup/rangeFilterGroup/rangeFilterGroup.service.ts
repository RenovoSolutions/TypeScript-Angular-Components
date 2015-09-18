// uses typings/angularjs
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../filterGroup.service.ts' />

module rl.ui.components.cardContainer.filters.filterGroup.rangeFilterGroup {
	'use strict';

	export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.rangeFilterGroup';
	export var factoryName: string = 'rangeFilterGroup';

	import __object = rl.utilities.services.object;

	export interface IRangeFilterGroupSettings {
		label: string;
		type: string;
		getValue<TItemType>(item: TItemType): number;
		options: IRangeFilterOptionSettings[];
	}
	
	export interface IRangeFilterOptionSettings {
		label: string;
		highInclusive?: number;
		highExclusive?: number;
		lowInclusive?: number;
		lowExclusive?: number;
	}
	
	export interface IRangeFilterOption extends IFilterOption {
		highInclusive?: number;
		highExclusive?: number;
		lowInclusive?: number;
		lowExclusive?: number;
	}
	
	export interface IRangeFilterGroup extends IFilterGroup {
		options: IRangeFilterOption[];
	}
	
	class RangeFilterGroup extends FilterGroup implements IRangeFilterGroup {
		private getValue: { (item: any): number };
	
		constructor(settings: IRangeFilterGroupSettings, object: __object.IObjectUtility) {
			this.getValue = settings.getValue;
			settings.options = _.map(settings.options, this.buildRangeOption, this);
			super(<any>settings, object);
		}
	
		private buildRangeOption(option: IRangeFilterOptionSettings): IRangeFilterOption {
			var modeOption: IRangeFilterOption = <any>option;
			modeOption.filter = (item: number): boolean => {
				var value: number = this.getValue(item);
	
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
	}
	
	export interface IRangeFilterGroupFactory {
		getInstance(settings: IRangeFilterGroupSettings): IRangeFilterGroup;
	}
	
	rangeFilterGroupFactory.$inject = [__object.serviceName];
	export function rangeFilterGroupFactory(object: __object.IObjectUtility): IRangeFilterGroupFactory {
		'use strict';
		return {
			getInstance(settings: IRangeFilterGroupSettings): IRangeFilterGroup {
				return new RangeFilterGroup(settings, object);
			},
		};
	}
	
	angular.module(moduleName, [__object.moduleName])
		.factory(factoryName, rangeFilterGroupFactory);
}
