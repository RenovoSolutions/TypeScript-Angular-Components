/// <reference path='sorts/sortDirection.ts' />
/// <reference path='sorts/sort.ts' />

module rl.ui.components.cardContainer {
	'use strict';

	export interface IBreakpointSize {
		xs?: number;
		sm?: number;
		md?: number;
		lg?: number;
	}
	
	export interface ISecondarySorts {
		ascending?: sorts.IPartialSort[];
		descending?: sorts.IPartialSort[];
	}
	
	export interface IColumn {
		label: string;
		description?: string;
		size: IBreakpointSize | number;
		getValue<TItemType>(item: TItemType): number | string | boolean;
		headerTemplateUrl?: string;
		headerTemplate?: string;
		templateUrl?: string;
		template?: string;
		secondarySorts?: ISecondarySorts;
		flipSort?: boolean;
		sortDirection?: sorts.SortDirection;
	}
}
