import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { each } from 'lodash';

import { IDataSource } from '../../dataSources/index';
import { SelectableCardContainerComponent, ISelectableItem } from '../../selectableCardContainer';

@Component({
	selector: 'rlSelection',
	template: require('./selectionControl.html'),
})
export class SelectionComponent<T extends ISelectableItem> implements OnInit {
	pagingEnabled: boolean;
	dataSource: IDataSource<T>;

	cardContainer: SelectableCardContainerComponent<T>;

	constructor(@Inject(forwardRef(() => SelectableCardContainerComponent)) cardContainer: SelectableCardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}

	// get selectedItems$(): Observable<number> {
	// 	return this.cardContainer.numberSelected$;
	// }

	ngOnInit(): void {
		this.pagingEnabled = !!this.cardContainer.dataSource.pager;
		this.dataSource = this.cardContainer.dataSource;
	}

	// selectPage(): void {
	// 	each(this.dataSource.dataSet, item => {
	// 		item.viewData.selected = true;
	// 	});
	// 	this.cardContainer.selectionChanged.emit(null);
	// }

	// selectAll(): void {
	// 	each(this.dataSource.filteredDataSet, item => {
	// 		item.viewData.selected = true;
	// 	});
	// 	this.cardContainer.selectionChanged.emit(null);
	// }

	// clearPage(): void {
	// 	each(this.dataSource.dataSet, item => {
	// 		item.viewData.selected = false;
	// 	});

	// 	this.cardContainer.selectionChanged.emit(null);
	// }

	// clearAll(): void {
	// 	each(this.dataSource.filteredDataSet, item => {
	// 		item.viewData.selected = false;
	// 	});

	// 	this.cardContainer.selectionChanged.emit(null);
	// }
}
