import { Component, Inject, OnInit, forwardRef } from '@angular/core';
import { each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { IDataSource } from '../../dataSources/index';
import { SelectableCardContainerComponent, ISelectableItem } from '../../selectableCardContainer';
import { ButtonComponent } from '../../../buttons/index';

@Component({
	selector: 'rlSelection',
	template: require('./selectionControl.html'),
	directives: [ButtonComponent],
})
export class SelectionComponent<T extends ISelectableItem> implements OnInit {
	selectedItems: number;
	pagingEnabled: boolean;
	dataSource: IDataSource<T>;

	cardContainer: SelectableCardContainerComponent<T>;
	boolean: __boolean.IBooleanUtility;

	constructor(@Inject(forwardRef(() => SelectableCardContainerComponent)) cardContainer: SelectableCardContainerComponent<T>
			, boolean: __boolean.BooleanUtility) {
		this.cardContainer = cardContainer;
		this.boolean = boolean;
	}

	ngOnInit(): void {
		this.selectedItems = this.cardContainer.numberSelected;
		this.pagingEnabled = this.boolean.toBool(this.cardContainer.dataSource.pager);
		this.dataSource = this.cardContainer.dataSource;

		this.cardContainer.numberSelectedChanges.subscribe((value: number): void => {
			this.selectedItems = value;
		});
	}

	selectPage(): void {
		each(this.dataSource.dataSet, item => {
			item.viewData.selected = true;
		});
		this.cardContainer.selectionChanged.emit(null);
	}

	selectAll(): void {
		each(this.dataSource.filteredDataSet, item => {
			item.viewData.selected = true;
		});
		this.cardContainer.selectionChanged.emit(null);
	}

	clearPage(): void {
		each(this.dataSource.dataSet, item => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged.emit(null);
	}

	clearAll(): void {
		each(this.dataSource.filteredDataSet, item => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged.emit(null);
	}
}