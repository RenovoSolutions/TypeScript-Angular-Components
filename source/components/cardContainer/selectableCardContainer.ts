import { Component, Input, Output, EventEmitter, Provider, forwardRef, ContentChild, ContentChildren, QueryList } from '@angular/core';
import { each, isUndefined, filter, difference } from 'lodash';

import { services, filters } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;
import __isEmpty = filters.isEmpty;

import { IColumn } from './column';
import { SortDirection, ISortDirections } from './sorts/index';
import { DataPager } from './paging/dataPager/dataPager.service';

import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';

import { SelectableCardComponent } from './card/selectableCard';
import { ColumnHeaderComponent } from './container/columnHeader/columnHeader';
import { ContainerHeaderComponent } from './container/containerHeader.component';
import { SelectableContainerFooterComponent } from './container/selectableContainerFooter.component';
import { BusyComponent } from '../busy/busy';
import { CardContainerComponent, cardContainerInputs } from './cardContainer';

import { CardContainerType } from './builder/cardContainerBuilder.service';

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
	inputs: [cardContainerInputs.builder, cardContainerInputs.save],
	providers: [
		DataPager,
		new Provider(CardContainerComponent, {
			useExisting: forwardRef(() => SelectableCardContainerComponent),
		}),
	],
	directives: [
		ContainerHeaderComponent,
		SelectableContainerFooterComponent,
		ColumnHeaderComponent,
		SelectableCardComponent,
		BusyComponent,
	],

	pipes: [__isEmpty.IsEmptyPipe],
})
export class SelectableCardContainerComponent<T extends ISelectableItem> extends CardContainerComponent<T> {
	@Input() searchPlaceholder: string;
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

	constructor(object: __object.ObjectUtility
			, array: __array.ArrayUtility
			, pager: DataPager) {
		super(object, array, pager);
		this.type = CardContainerType.selectable;
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.dataSource.changed.subscribe(this.addViewData);
		this.dataSource.redrawing.subscribe(this.clearFilteredSelections);

		this.addViewData();

		this.selectionChanged.subscribe(this.updateSelected);

		this.selectionColumn = {
			label: null,
			size: null,
			getValue(item: any): boolean {
				return item.viewData.selected;
			},
			flipSort: true,
		};
	}

	sortSelected(): void {
		this.sort(this.selectionColumn);
	}

	private addViewData: {(): void} = (): void => {
		each(this.dataSource.rawDataSet, (item: T): void => {
			if (isUndefined(item.viewData)) {
				item.viewData = {
					selected: false,
				};
			}
		});

		this.updateDisabledSelections();
	}

	private clearFilteredSelections: {(): void} = (): void => {
		let nonVisibleItems: any[] = difference(this.dataSource.rawDataSet, this.dataSource.filteredDataSet);

		each(nonVisibleItems, (item: T): void => {
			if (isUndefined(item.viewData)) {
				item.viewData = {
					selected: false,
				};
			}

			item.viewData.selected = false;
			item.viewData.selectionTitle = defaultSelectionTitle;
		});

		this.updateSelected();
	}

	private updateSelected: {(): void} = (): void => {
		this.numberSelected = filter(this.dataSource.filteredDataSet, (item: T): boolean => {
			return item.viewData != null && item.viewData.selected;
		}).length;
		this.numberSelectedChanges.next(this.numberSelected);
	}

	private updateDisabledSelections: {(): void} = (): void => {
		if (this.disableSelection) {
			each(this.dataSource.rawDataSet, (item: T): void => {
				let disabledReason: string = this.disableSelection({ item: item });
				item.viewData.disabledSelection = (disabledReason != null);
				item.viewData.selectionTitle = (item.viewData.disabledSelection ? disabledReason : defaultSelectionTitle);
			});
		}
	}
}