import { Component } from '@angular/core';
import { Subject } from 'rxjs';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;

import { IViewDataEntity } from '../../types/viewData';
import { IDataSource } from './dataSources/index';
import { DataPager } from './paging/index';
import { IColumn, ISecondarySorts, IBreakpointSize } from './column';
import { ISort, IPartialSort, SortDirection, ISortDirections } from './sorts/index';
import { dataPagerFactoryName } from '../../componentsDowngrade';

import { xs, sm, md, lg } from '../../services/breakpoints/breakpoint';

import { ICardContainerBuilder, CardContainerBuilder } from './cardContainerBuilder.service';

export const defaultMaxColumnSorts: number = 2;
export const defaultSelectionTitle: string = 'Select card';

@Component({
	selector: 'rlCardContainer',
	template: '<ng-content></ng-content>',
})
export class CardContainerComponent {
	filters: any;
	paging: boolean;
	columns: any;
	containerData: any;
	clickableCards: boolean;
	maxColumnSorts: number;
	permanentFooters: boolean;
	selectableCards: boolean;
	disableSelection: any;
	renderFilters: any;
	saveWhenInvalid: boolean;
	numberSelected: number = 3;
	numberSelectedChanges: Subject<number> = new Subject<number>();
	dataSource: any = {
		dataSet: items,
		filteredDataSet: [items[0], items[1]],
		refresh: () => null,
		remove: () => null,
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

	openCard(): boolean {
		return true;
	}
}