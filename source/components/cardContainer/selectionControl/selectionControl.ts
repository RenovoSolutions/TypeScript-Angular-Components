import { Component, Inject, OnInit } from '@angular/core';
import { each } from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { IDataSource } from '../dataSources/index';
import { CardContainerComponent } from '../cardContainer';
import { BUTTON_DIRECTIVES } from '../../buttons/index';

@Component({
	selector: 'rlSelection',
	template: require('./selectionControl.html'),
	directives: [BUTTON_DIRECTIVES],
})
export class SelectionComponent implements OnInit {
	selectedItems: number;
	pagingEnabled: boolean;
	dataSource: IDataSource<any>;

	cardContainer: CardContainerComponent;
	boolean: __boolean.IBooleanUtility;

	constructor(cardContainer: CardContainerComponent
			, @Inject(__boolean.booleanToken) boolean: __boolean.IBooleanUtility) {
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
		this.cardContainer.selectionChanged();
	}

	selectAll(): void {
		each(this.dataSource.filteredDataSet, item => {
			item.viewData.selected = true;
		});
		this.cardContainer.selectionChanged();
	}

	clearPage(): void {
		each(this.dataSource.dataSet, item => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged();
	}

	clearAll(): void {
		each(this.dataSource.filteredDataSet, item => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged();
	}
}