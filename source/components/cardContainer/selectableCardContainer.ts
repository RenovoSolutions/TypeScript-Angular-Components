import { Component, Output, EventEmitter, forwardRef, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { each, isUndefined, filter, difference } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;

import { IColumn } from './column';
import { SortDirection, ISortDirections, SortManagerService } from './sorts/index';
import { DataPagerOld } from './paging/dataPager/dataPagerOld.service';

import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';

import { SelectableCardComponent } from './card/selectableCard';
import { CardContainerComponent, cardContainerInputs } from './cardContainer';

import { CardContainerTypeOld } from './builder/cardContainerBuilderOld.service';

export const defaultSelectionTitle: string = 'Select card';

export interface ISelectableItem {
	viewData?: ISelectionViewData;
}

export interface ISelectionViewData {
	selected?: boolean;
	disabledSelection?: boolean;
	selectionTitle?: string;
}

@Component({
	selector: 'rlSelectableCardContainer',
	template: require('./selectableCardContainer.html'),
	inputs: [
		cardContainerInputs.builder,
		cardContainerInputs.save,
		cardContainerInputs.searchPlaceholder
	],
	providers: [
		DataPagerOld,
		SortManagerService,
		{
			provide: CardContainerComponent,
			useExisting: forwardRef(() => SelectableCardContainerComponent),
		},
	],
})
export class SelectableCardContainerComponent<T extends ISelectableItem> extends CardContainerComponent<T> {
	@Output() selectionChanged: EventEmitter<void> = new EventEmitter<void>();

	selectionColumn: IColumn<any>;
	sortDirections: ISortDirections = SortDirection;
	disableSelection: { (item: any): string };

	@ContentChild(ContainerHeaderTemplate) containerHeader: ContainerHeaderTemplate;
	@ContentChild(ContainerFooterTemplate) containerFooter: ContainerFooterTemplate;
	@ContentChild(CardContentTemplate) cardContent: CardContentTemplate;
	@ContentChild(CardFooterTemplate) cardFooter: CardFooterTemplate;
	@ContentChildren(ColumnContentTemplate) columnTemplates: QueryList<ColumnContentTemplate>;
	@ContentChildren(ColumnHeaderTemplate) columnHeaders: QueryList<ColumnHeaderTemplate>;

	// constructor(array: __array.ArrayUtility, pager: DataPagerOld, sortManager: SortManagerService) {
	// 	super(array, pager, sortManager);
	// 	this.type = CardContainerType.selectable;
	// }

	// ngOnInit(): void {
	// 	super.ngOnInit();

	// 	this.dataSource.changed.subscribe(this.addViewData);
	// 	this.dataSource.redrawing.subscribe(this.clearFilteredSelections);

	// 	this.addViewData();

	// 	this.selectionChanged.subscribe(this.updateSelected);

	// 	this.selectionColumn = {
	// 		label: null,
	// 		size: null,
	// 		getValue(item: any): boolean {
	// 			return item.viewData.selected;
	// 		},
	// 		flipSort: true,
	// 	};
	// }

	// sortSelected(): void {
	// 	this.sort(this.selectionColumn);
	// }

	// private addViewData: {(): void} = (): void => {
	// 	each(this.dataSource.rawDataSet, (item: T): void => {
	// 		if (isUndefined(item.viewData)) {
	// 			item.viewData = {
	// 				selected: false,
	// 			};
	// 		}
	// 	});

	// 	this.updateDisabledSelections();
	// }

	// private clearFilteredSelections: {(): void} = (): void => {
	// 	let nonVisibleItems: any[] = difference(this.dataSource.rawDataSet, this.dataSource.filteredDataSet);

	// 	each(nonVisibleItems, (item: T): void => {
	// 		if (isUndefined(item.viewData)) {
	// 			item.viewData = {
	// 				selected: false,
	// 			};
	// 		}

	// 		item.viewData.selected = false;
	// 		item.viewData.selectionTitle = defaultSelectionTitle;
	// 	});

	// 	this.updateSelected();
	// }

	// private updateSelected: {(): void} = (): void => {
	// 	this.numberSelected = filter(this.dataSource.filteredDataSet, (item: T): boolean => {
	// 		return item.viewData != null && item.viewData.selected;
	// 	}).length;
	// 	this.numberSelectedChanges.next(this.numberSelected);
	// }

	// private updateDisabledSelections: {(): void} = (): void => {
	// 	if (this.disableSelection) {
	// 		each(this.dataSource.rawDataSet, (item: T): void => {
	// 			let disabledReason: string = this.disableSelection({ item: item });
	// 			item.viewData.disabledSelection = (disabledReason != null);
	// 			item.viewData.selectionTitle = (item.viewData.disabledSelection ? disabledReason : defaultSelectionTitle);
	// 		});
	// 	}
	// }
}
