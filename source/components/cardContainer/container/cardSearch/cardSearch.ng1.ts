import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { CardContainerController } from '../../cardContainer.ng1';

export let moduleName: string = 'rl.ui.components.cardContainer.cardSearch';
export let componentName: string = 'rlCardSearch';
export let controllerName: string = 'CardSearchController';

export let defaultSearchPlaceholder: string = 'Search';
export let defaultSearchDelay: number = 1000;

export interface ICardSearchBindings {
	delay: number;
}

export class CardSearchController {
	// bindings
	delay: number;

	searchLengthError: boolean = false;
	minSearchLength: number;
	hasSearchFilter: boolean = true;
	minSearchError: string;
	private _searchText: string;
	private cardContainer: CardContainerController;
	private searchFilter: __genericSearchFilter.IGenericSearchFilter;
	private timer: angular.IPromise<void>;

	get searchText(): string {
		return this.searchFilter
			? this.searchFilter.searchText
			: null;
	}

	set searchText(search: string) {
		this.searchFilter.searchText = search;
		this.minSearchLength = this.searchFilter.minSearchLength;

		this.validateSearchLength(search, this.minSearchLength);

		if (this.timer != null) {
			this.$timeout.cancel(this.timer);
		}

		if (!this.searchLengthError) {
			this.timer = this.$timeout<void>(this.cardContainer.dataSource.refresh.bind(this.cardContainer.dataSource), this.delay);
		}
	}

	static $inject: string[] = ['$timeout'];
	constructor(private $timeout: angular.ITimeoutService) {}

	get focusOn(): boolean {
		return this.cardContainer.focusSearchOn;
	}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.minSearchError = 'You must enter at least {{cardSearch.minSearchLength}} characters to perform a search';

		if (this.searchFilter == null) {
			let filter: __genericSearchFilter.IGenericSearchFilter = this.cardContainer.searchFilter;
			this.searchFilter = filter;

			if (filter == null) {
				this.hasSearchFilter = false;
			}
		}

		if (this.hasSearchFilter) {
			this.delay = this.delay != null
				? this.delay
				: defaultSearchDelay;

			this.searchFilter.subscribe((): void => {
				this.searchText = this.searchFilter.searchText;
			});
		}
	}

	get searchPlaceholder(): string {
		if (this.hasSearchFilter) {
			return this.cardContainer.searchPlaceholder || defaultSearchPlaceholder;
		}
	}

	private validateSearchLength(search: string, minLength: number): void {
		// show error if search string exists but is below minimum size
		this.searchLengthError = search != null
								&& search.length > 0
								&& search.length < minLength;
	}
}

let cardSearch: angular.IComponentOptions = {
	require: { cardContainer: '?^^rlCardContainer' },
	template: require('./cardSearch.ng1.html'),
	controller: controllerName,
	controllerAs: 'cardSearch',
	bindings: {
		delay: '<?searchDelay',
		searchFilter: '<?',
	},
};

angular.module(moduleName, [])
	.component(componentName, cardSearch)
	.controller(controllerName, CardSearchController);
