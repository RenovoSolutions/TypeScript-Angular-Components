'use strict';

export interface ISortDirections {
	ascending: SortDirection;
	descending: SortDirection;
	none: SortDirection;
}

export class SortDirection {
	public static none: SortDirection = new SortDirection(0);
	public static ascending: SortDirection = new SortDirection(1);
	public static descending: SortDirection = new SortDirection(2);

	constructor(public value: number) { }

	public static toggle(direction: SortDirection): SortDirection {
		if (direction === SortDirection.ascending) {
			return SortDirection.descending;
		} else if (direction === SortDirection.descending) {
			return SortDirection.none;
		} else {
			return SortDirection.ascending;
		}
	}

	public static getFullName(direction: SortDirection): string {
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
