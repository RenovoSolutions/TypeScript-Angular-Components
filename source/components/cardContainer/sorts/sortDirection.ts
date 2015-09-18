module rl.ui.components.cardContainer.sorts {
	'use strict';

	export enum SortDirection {
		none = 0,
		ascending = 1,
		descending = 2,
	}
	
	export interface ISortDirections {
		ascending: SortDirection;
		descending: SortDirection;
		none: SortDirection;
	}
	
	export function toggle(direction: SortDirection): SortDirection {
		'use strict';
		if (direction === SortDirection.ascending) {
			return SortDirection.descending;
		} else if (direction === SortDirection.descending) {
			return SortDirection.none;
		} else {
			return SortDirection.ascending;
		}
	}
	
	export function getFullName(direction: SortDirection): string {
		'use strict';
		if (direction === SortDirection.ascending) {
			return 'ascending';
		} else if (direction === SortDirection.descending) {
			return 'descending';
		} else {
			return 'none';
		}
	}
}
