import { Component } from '@angular/core';
import { Subject } from 'rxjs';

const items: any = [
	{
		viewData: {
			selected: false,
		},
	},
	{
		viewData: {
			selected: false,
		},
	},
	{
		viewData: {
			selected: false,
		},
	},
	{
		viewData: {
			selected: false,
		},
	},
];

@Component({
	selector: 'rlCardContainer',
	template: '<ng-content></ng-content>',
})
export class CardContainerComponent {
	numberSelected: number = 3;
	numberSelectedChanges: Subject<number> = new Subject<number>();
	dataSource: any = {
		dataSet: items,
		filteredDataSet: [items[0], items[1]],
		refresh: () => null,
		count: 100,
		countChanges: new Subject<number>(),
		pager: {
			pageSize: 5,
			pageSizeChanges: new Subject<number>(),
			pageNumber: 1,
		},
	};
	selectionChanged = () => console.log('changed');
	searchFilter: any = {
		searchText: null,
		minSearchLength: 3,
	};
}