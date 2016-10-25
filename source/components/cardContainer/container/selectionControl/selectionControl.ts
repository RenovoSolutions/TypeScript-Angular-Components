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
		const subscription = this.cardContainer.selectionData$.subscribe(data => {
			setTimeout(() => {
				subscription.unsubscribe()
				this.cardContainer.setSelected(data, true);
			});
		});
	}

	selectAll(): void {
		const subscription = this.cardContainer.selectionFilteredData$.subscribe(data => {
			setTimeout(() => {
				subscription.unsubscribe()
				this.cardContainer.setSelected(data, true);
			});
		});
	}

	clearPage(): void {
		const subscription = this.cardContainer.selectionData$.subscribe(data => {
			setTimeout(() => {
				subscription.unsubscribe()
				this.cardContainer.setSelected(data, false);
			});
		});
	}

	clearAll(): void {
		const subscription = this.cardContainer.selectionFilteredData$.subscribe(data => {
			setTimeout(() => {
				subscription.unsubscribe()
				this.cardContainer.setSelected(data, false);
			});
		});
	}
}
