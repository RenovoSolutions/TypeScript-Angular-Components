import * as angular from 'angular';
import * as _ from 'lodash';
import * as Rx from 'rxjs';

import { services, filters, downgrade } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __genericSearchFilter = services.genericSearchFilter;

import { IParentChildBehaviorService, serviceName as parentChildServiceName } from '../../services/parentChild/parentChild.service';
import { IViewDataEntity } from '../../types/viewData';
import { IDataSource } from './dataSources/dataSources.module';
import { DataPager } from './dataSources/dataPager/dataPager.service';
import { IColumn, ISecondarySorts, IBreakpointSize } from './column';
import { ISort, IPartialSort, SortDirection, ISortDirections } from './sorts/sorts.module';
import { dataPagerFactoryName } from '../../componentsDowngrade';

import { xs, sm, md, lg } from '../../services/breakpoints/breakpoint';

import { ICardContainerBuilder, CardContainerBuilder } from './cardContainerBuilder.service';

export let componentName: string = 'rlCardContainer';
export let controllerName: string = 'CardContainerController';

export let defaultMaxColumnSorts: number = 2;
export let defaultSelectionTitle: string = 'Select card';

export interface ICardContainerScope extends angular.IScope {
	containerData: any;
}

export interface ICardContainerBindings {
	/**
	 * A builder for the card container
	 */
	builder: ICardContainerBuilder;

	/**
	 * Controller shared by all components on a card
	 * this controller cannot override any of the following letiable names:
	 *      columns
	 *      item
	 *      contentTemplate
	 *      footerTemplate
	 *      clickable
	 *      cardController
	 *      cardControllerAs
	 *      cardAs
	 *      showContent
	 *      toggleContent
	 *      collapse
	 *      selected
	 *      setSelected
	 */
	cardController: string;

	/**
	 * Controller alias specified using controllerAs syntax
	 */
	cardControllerAs: string;

	/**
	 * Name used to access the card data
	 */
	cardAs: string;

	/**
	 * Event that first when a card is selected or deselected
	 */
	selectionChangedEvent: { (): void };
}

export interface ICardBehavior {
	close(): boolean;
}

export interface ICardContainerAttrs extends angular.IAttributes {
	disableSelection: string;
}

export interface ISelectionViewData {
	selected: boolean;
	selectionTitle?: string;
	disabledSelection?: boolean;
}

export class CardContainerController {
	// bindings
	builder: CardContainerBuilder;

	source: IDataSource<any>;
	filters: filters.IFilter[];
	searchFilter: __genericSearchFilter.IGenericSearchFilter;
	paging: boolean;
	columns: IColumn<any>[];
	containerData: any;
	cardController: string;
	cardControllerAs: string;
	cardAs: string;
	clickableCards: boolean;
	maxColumnSorts: number;
	permanentFooters: boolean;
	selectableCards: boolean;
	disableSelection: { (item: any): string };
	renderFilters: boolean;
	saveWhenInvalid: boolean;
	selectionChangedEvent: { (): void };

	dataSource: IDataSource<any>;
	sortDirection: ISortDirections;
	numberSelected: number = 0;
	numberSelectedChanges: Rx.Subject<number>;
	selectionColumn: IColumn<any>;
	private maxColSorts: number;
	private disablingSelections: boolean;

	makeCard: angular.ITranscludeFunction;

	static $inject: string[] = ['$scope', '$attrs', '$transclude', dataPagerFactoryName, downgrade.objectServiceName, downgrade.arrayServiceName, parentChildServiceName];
	constructor(private $scope: ICardContainerScope
			, $attrs: ICardContainerAttrs
			, $transclude: angular.ITranscludeFunction
			, private dataPagerFactory: any
			, private object: __object.IObjectUtility
			, private array: __array.IArrayUtility
			, private parentChild: IParentChildBehaviorService) {
		if (this.builder != null) {
			this.builder.setCardContainerProperties(this);
		}

		this.makeCard = $transclude;
		this.dataSource = this.source;
		this.permanentFooters = _.isUndefined(this.permanentFooters) ? false : this.permanentFooters;
		this.maxColSorts = this.maxColumnSorts != null ? this.maxColumnSorts : defaultMaxColumnSorts;
		this.disablingSelections = object.isNullOrWhitespace($attrs.disableSelection) === false;
		this.sortDirection = SortDirection;
		this.numberSelectedChanges = new Rx.Subject<number>();

		this.syncFilters();

		this.setupPaging();

		this.buildColumnSizes();

		if (this.selectableCards) {
			//*use card container event service?
			$scope.$on('updateDisabledSelections', this.updateDisabledSelections);

			this.dataSource.changed.subscribe(this.addViewData);
			this.dataSource.redrawing.subscribe(this.clearFilteredSelections);

			this.addViewData();

			this.selectionColumn = {
				label: null,
				size: null,
				getValue(item: any): boolean {
					return item.viewData.selected;
				},
				flipSort: true,
			};
		}

		if (this.dataSource.sorts == null) {
			this.dataSource.sorts = [];
		}

		$scope.containerData = this.containerData;
	}

	sortSelected(): void {
		this.sort(this.selectionColumn);
	}

	openCard(): boolean {
		let behaviors: ICardBehavior[] = this.parentChild.getAllChildBehaviors<ICardBehavior>(this.dataSource.dataSet);

		return _.every(_.map(behaviors, (behavior: ICardBehavior): boolean => { return behavior.close(); }));
	}

	sort(column: IColumn<any>): void {
		let sortList: ISort[] = this.dataSource.sorts;
		let firstSort: ISort = sortList[0];

		// If column is already the primary sort, change the direction
		if (firstSort != null
			&& firstSort.column === column) {
			firstSort.direction = SortDirection.toggle(firstSort.direction);

			// Clear sort
			if (firstSort.direction === SortDirection.none) {
				this.clearVisualSortIndicator(firstSort);
				firstSort = null;

				// If the column has secondary sorts don't fall back to a
				//  secondary sort, instead just clear all sorts
				if (column.secondarySorts != null) {
					sortList.length = 0;
				} else { // otehrwise, clear the primary sort and fallback to previous sort
					sortList.shift();
				}
			}
		} else {
			// Else make column primary ascending sort

			// Remove any existing non-primary sorts on column
			this.array.remove(sortList, (sort: ISort): boolean => {
				return column === sort.column;
			});

			// Build ascending sort for column
			let newSort: ISort = {
				column: column,
				direction: SortDirection.ascending,
			};

			sortList.unshift(newSort);

			firstSort = newSort;
		}

		this.updateVisualColumnSorting();

		// If column has secondary sorts, wipe the sort order and just apply the secondary sorts
		if (firstSort != null && column.secondarySorts != null) {
			sortList.length = 0;
			let secondarySorts: ISort[] = this.buildSecondarySorts(firstSort.direction, column.secondarySorts);
			sortList.push(firstSort);
			sortList.push.apply(sortList, secondarySorts);
		} else {
			// If not using column secondary sorts, limit the maximum number
			//  of sorts applied to the maximum number of sorts
			this.dataSource.sorts = _.take(sortList, this.maxColSorts);
		}

		this.dataSource.onSortChange();
	}

	selectionChanged(): void {
		this.updateSelected();
		this.selectionChangedEvent();
	}

	private syncFilters(): void {
		if (!this.object.isNullOrEmpty(this.filters)) {
			this.dataSource.filters = this.filters;
			this.dataSource.refresh();
		} else if (this.dataSource.filters != null) {
			this.filters = this.dataSource.filters;
		}
	}

	private setupPaging(): void {
		// If paging flag is specified, card container controls pager instance
		if (this.paging != null) {
			if (this.paging === false) {
				this.dataSource.pager = null;
			} else {
				this.builder._pager = this.dataPagerFactory.getInstance();
				this.dataSource.pager = this.builder._pager;
			}
		} else if (this.dataSource.pager) {
			// If the paging flag is not set and the dataSource has a pager, save a reference here
			this.builder._pager = this.dataSource.pager;
		}

		this.dataSource.initPager();
	}

	private buildColumnSizes(): void {
		_.each(this.columns, (column: IColumn<any>): void => {
			let sizes: IBreakpointSize | number = column.size;
			if (_.isObject(sizes)) {
				sizes[xs] = this.object.valueOrDefault(sizes[xs], 0);
				sizes[sm] = this.object.valueOrDefault(sizes[sm], sizes[xs]);
				sizes[md] = this.object.valueOrDefault(sizes[md], sizes[sm]);
				sizes[lg] = this.object.valueOrDefault(sizes[lg], sizes[md]);
			} else {
				column.size = {
					xs: <number>sizes,
					sm: <number>sizes,
					md: <number>sizes,
					lg: <number>sizes,
				};
			}
		});
	}

	private addViewData: {(): void} = (): void => {
		_.each(this.dataSource.rawDataSet, (item: IViewDataEntity<ISelectionViewData>): void => {
			if (_.isUndefined(item.viewData)) {
				item.viewData = {
					selected: false,
				};
			}
		});

		this.updateDisabledSelections();
	}

	private lookupColumn(label: string): IColumn<any> {
		return _.find(this.columns, (column: IColumn<any>): boolean => {
			return column.label === label;
		});
	}

	private clearFilteredSelections: {(): void} = (): void => {
		let nonVisibleItems: any[] = _.difference(this.dataSource.rawDataSet, this.dataSource.filteredDataSet);

		_.each(nonVisibleItems, (item: IViewDataEntity<ISelectionViewData>): void => {
			if (_.isUndefined(item.viewData)) {
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
		this.numberSelected = _.filter(this.dataSource.filteredDataSet, (item: IViewDataEntity<ISelectionViewData>): boolean => {
			return item.viewData != null && item.viewData.selected;
		}).length;
		this.numberSelectedChanges.next(this.numberSelected);
	}

	private updateDisabledSelections: {(): void} = (): void => {
		if (this.disablingSelections) {
			_.each(this.dataSource.rawDataSet, (item: IViewDataEntity<ISelectionViewData>): void => {
				let disabledReason: string = this.disableSelection({ item: item });
				item.viewData.disabledSelection = (disabledReason != null);
				item.viewData.selectionTitle = (item.viewData.disabledSelection ? disabledReason : defaultSelectionTitle);
			});
		}
	}

	private buildSecondarySorts(direction: SortDirection, secondarySorts: ISecondarySorts): ISort[] {
		let sortList: IPartialSort[] = secondarySorts[SortDirection.getFullName(direction)];
		return _.map(sortList, (sort: IPartialSort): ISort => {
			return {
				direction: sort.direction,
				column: this.lookupColumn(sort.column),
			};
		});
	}

	private updateVisualColumnSorting(): void {
		_.each(this.dataSource.sorts, (sort: ISort, index: number): void => {
			// Only first sort should have visible direction
			if (index === 0) {
				this.updateVisualSortIndicator(sort);
			} else {
				this.clearVisualSortIndicator(sort);
			}
		});
	}

	private updateVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = sort.direction;
	}

	private clearVisualSortIndicator(sort: ISort): void {
		sort.column.sortDirection = null;
	}
}

export let cardContainer: angular.IComponentOptions = {
	transclude: <any>{
		'containerHeaderSlot': '?rlContainerHeader',
		'containerFooterSlot': '?rlContainerFooter',
		'contentSlot': '?rlCardContent',
		'footerSlot': '?rlCardFooter',
	},
	template: require('./cardContainer.html'),
	controller: controllerName,
	controllerAs: 'cardContainer',
	bindings: {
		builder: '=?',
		cardController: '@',
		cardControllerAs: '@',
		cardAs: '@',
		selectionChangedEvent: '&selectionChanged',
	}
}
