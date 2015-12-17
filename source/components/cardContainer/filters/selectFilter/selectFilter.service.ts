'use strict';

export let factoryName: string = 'selectFilter';

export interface ISelectFilter {

}

class SelectFilter {

}

export interface ISelectFilterFactory {
	getInstance(): ISelectFilter;
}

export function selectFilterFactory(): ISelectFilterFactory {
	return {
		getInstance(): ISelectFilter {
			return SelectFilter;
		},
	};
}
