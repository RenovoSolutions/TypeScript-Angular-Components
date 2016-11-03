import { Component, Output, EventEmitter, forwardRef, ContentChild, ContentChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { map, find, clone, filter, includes } from 'lodash';
import { Observable, BehaviorSubject } from 'rxjs';

import { IColumn } from './column';
import { SortDirection, ISortDirections, SortManagerService } from './sorts/index';
import { DataPager } from './paging/dataPager/dataPager.service';
import { IFilter, SearchFilter } from './filters/index';

import { CardContentTemplate, CardFooterTemplate } from '../cards/index';
import { ContainerHeaderTemplate, ContainerFooterTemplate, ColumnContentTemplate } from './templates/index';
import { ColumnHeaderTemplate } from './templates/columnHeader.template';

import { SelectableCardComponent } from './card/selectableCard';
import { CardContainerComponent, cardContainerInputs } from './cardContainer';

import { CardContainerType } from './builder/cardContainerBuilder.service';

export const defaultSelectionTitle: string = 'Select card';

export interface IdentityItem {
	id?: number;
}

export interface ISelectionWrappedItem<T> {
	item: T;
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
		DataPager,
		SearchFilter,
		SortManagerService,
		{
			provide: CardContainerComponent,
			useExisting: forwardRef(() => SelectableCardContainerComponent),
		},
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectableCardContainerComponent<T extends IdentityItem> extends CardContainerComponent<T> {
	private _numberSelected: BehaviorSubject<number>;
	private _selectionFilteredData: BehaviorSubject<ISelectionWrappedItem<T>[]>;
	private _selectionData: BehaviorSubject<ISelectionWrappedItem<T>[]>;

	selectionColumn: IColumn<any>;
	sortDirections: ISortDirections = SortDirection;
	disableSelection: { (item: any): string };

	@ContentChild(ContainerHeaderTemplate) containerHeader: ContainerHeaderTemplate;
	@ContentChild(ContainerFooterTemplate) containerFooter: ContainerFooterTemplate;
	@ContentChild(CardContentTemplate) cardContent: CardContentTemplate;
	@ContentChild(CardFooterTemplate) cardFooter: CardFooterTemplate;
	@ContentChildren(ColumnContentTemplate) columnTemplates: QueryList<ColumnContentTemplate>;
	@ContentChildren(ColumnHeaderTemplate) columnHeaders: QueryList<ColumnHeaderTemplate>;

	constructor(pager: DataPager, searchFilter: SearchFilter, sortManager: SortManagerService) {
		super(pager, searchFilter, sortManager);
		this.type = CardContainerType.selectable;
		this._numberSelected = new BehaviorSubject(0);
		this._selectionFilteredData = new BehaviorSubject(null);
		this._selectionData = new BehaviorSubject(null);
	}

	get numberSelected$(): Observable<number> {
		return this._numberSelected.asObservable();
	}

	get selectionFilteredData$(): Observable<ISelectionWrappedItem<T>[]> {
		return this._selectionFilteredData.asObservable();
	}

	get selectionData$(): Observable<ISelectionWrappedItem<T>[]> {
		return this._selectionData.asObservable();
	}

	ngOnInit(): void {
		super.ngOnInit();

		this.dataSource.filteredDataSet$.subscribe(filteredData => {
			const selectionData = this._selectionFilteredData.getValue();
			this._selectionFilteredData.next(this.buildSelectionData(filteredData, selectionData));
		});

		this.dataSource.dataSet$.combineLatest(this._selectionFilteredData).subscribe(([data, selectionFilteredData]) => {
			this._selectionData.next(filter(selectionFilteredData, selection => includes(data, selection.item)));
		});

		this._selectionFilteredData.subscribe(selectionFilteredData => {
			const numberSelected = filter(selectionFilteredData, (selection: ISelectionWrappedItem<T>): boolean => {
				return selection.selected;
			}).length;
			this._numberSelected.next(numberSelected);
		});

		this.selectionColumn = {
			label: null,
			size: null,
			getValue: (item: T): boolean => {
				const selection = this.getSelection(item);
				return selection.selected;
			},
			flipSort: true,
		};
	}

	sortSelected(): void {
		this.sort(this.selectionColumn);
	}

	setSelected(selections: ISelectionWrappedItem<T>[], value: boolean): void {
		this.dataSource.filteredDataSet$.take(1).subscribe(filteredData => {
			let updatedSelections = map(selections, selection => {
				clone(selection);
				selection.selected = value;
				return selection;
			});

			const selectionFilteredData = this._selectionFilteredData.getValue();
			this._selectionFilteredData.next(map(selectionFilteredData, oldSelection => {
				const updatedSelection = find(updatedSelections, selection => oldSelection.item.id === selection.item.id);
				return updatedSelection	|| oldSelection;
			}));
		});
	}

	private getSelection(item: T): ISelectionWrappedItem<T> {
		const selectionFilteredData = this._selectionFilteredData.getValue();
		return find(selectionFilteredData, x => x.item.id === item.id);
	}

	private buildSelectionData(data: T[], selectionData: ISelectionWrappedItem<T>[]): ISelectionWrappedItem<T>[] {
		return map(data, (item: T): ISelectionWrappedItem<T> => {
			let selection = clone(find(selectionData, x => x.item.id === item.id));

			if (!selection) {
				selection = {
					item: item,
					selected: false,
				};
			} else {
				selection.item = item;
			}

			selection = this.setDisableSelection(selection);

			return selection;
		});
	}

	private setDisableSelection(selection: ISelectionWrappedItem<T>): ISelectionWrappedItem<T> {
		if (this.disableSelection) {
			const disabledReason: string = this.disableSelection({ item: selection.item });
			selection.disabledSelection = (disabledReason != null);
			selection.selectionTitle = (selection.disabledSelection ? disabledReason : defaultSelectionTitle);
		}
		return selection;
	}
}
