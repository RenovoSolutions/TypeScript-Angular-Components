module rl.ui.components.cardContainer.filters {
	'use strict';

	export interface IFilterWithCounts extends IFilter {
		updateOptionCounts<TItemType>(data: TItemType[]): void;
	}
	
	export interface IFilter {
		type: string;
		filter<TItemType>(item: TItemType): boolean;
	}
}
