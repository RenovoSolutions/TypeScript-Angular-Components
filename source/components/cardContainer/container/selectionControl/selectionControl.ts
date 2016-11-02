import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';
import { each } from 'lodash';

import { IDataSource } from '../../dataSources/index';
import { SelectableCardContainerComponent, ISelectionWrappedItem } from '../../selectableCardContainer';

@Component({
	selector: 'rlSelection',
	template: require('./selectionControl.html'),
})
export class SelectionComponent<T> implements OnInit {
	pagingEnabled: boolean;

	cardContainer: SelectableCardContainerComponent<T>;

	constructor(@Inject(forwardRef(() => SelectableCardContainerComponent)) cardContainer: SelectableCardContainerComponent<T>) {
		this.cardContainer = cardContainer;
	}

	get selectedItems$(): Observable<number> {
		return this.cardContainer.numberSelected$;
	}

	ngOnInit(): void {
		this.pagingEnabled = !!this.cardContainer.dataSource.pager;
	}

	selectPage(): void {
		this.cardContainer.selectionData$.first().subscribe(data => {
			this.cardContainer.setSelected(data, true);
		});
	}

	selectAll(): void {
		this.cardContainer.selectionFilteredData$.first().subscribe(data => {
			this.cardContainer.setSelected(data, true);
		});
	}

	clearPage(): void {
		this.cardContainer.selectionData$.first().subscribe(data => {
			this.cardContainer.setSelected(data, false);
		});
	}

	clearAll(): void {
		this.cardContainer.selectionFilteredData$.first().subscribe(data => {
			this.cardContainer.setSelected(data, false);
		});
	}
}
