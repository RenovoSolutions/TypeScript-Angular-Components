'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { IDataSource } from '../dataSources/dataSource';
import { CardContainerController } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.cardSearch';
export var directiveName: string = 'rlCardSearch';
export var controllerName: string = 'CardSearchController';

export var defaultSearchPlaceholder: string = 'Search';
export var defaultSearchDelay: number = 1000;

export interface ICardSearchBindings {
	delay: number;
}

export class CardSearchController {
	// bindings
	delay: number;

	searchPlaceholder: string;
	searchText: string;
	searchLengthError: boolean = false;
	minSearchLength: number;
	hasSearchFilter: boolean = true;
	minSearchError: string;
	private cardContainer: CardContainerController;
	private searchFilter: __genericSearchFilter.IGenericSearchFilter;

	static $inject: string[] = ['$scope', '$timeout'];
	constructor(private $scope: angular.IScope
			, private $timeout: angular.ITimeoutService) {}

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
			this.searchPlaceholder = defaultSearchPlaceholder;

			var dataSource: IDataSource<any> = this.cardContainer.dataSource;

			var delay: number = this.delay != null
				? this.delay
				: defaultSearchDelay;

			var timer: angular.IPromise<void>;

			this.$scope.$watch((): string => { return this.searchText; }, (search: string): void => {
				this.searchFilter.searchText = search;
				this.minSearchLength = this.searchFilter.minSearchLength;

				this.validateSearchLength(search, this.minSearchLength);

				if (timer != null) {
					this.$timeout.cancel(timer);
				}

				timer = this.$timeout<void>(dataSource.refresh.bind(dataSource), delay);
			});
			this.$scope.$watch(():string => {
				return this.searchFilter.searchText;
			},():void =>{
				this.searchText = this.searchFilter.searchText;
			});
		}
	}

	private validateSearchLength(search: string, minLength: number): void {
		// show error if search string exists but is below minimum size
		this.searchLengthError = search != null
								&& search.length > 0
								&& search.length < minLength;
	}
}

export function cardSearch(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: { cardContainer: '^^rlCardContainer' },
		template: require('./cardSearch.html'),
		controller: controllerName,
		controllerAs: 'cardSearch',
		scope: {},
		bindToController: {
			delay: '=searchDelay',
			searchFilter: '=?',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, cardSearch)
	.controller(controllerName, CardSearchController);
