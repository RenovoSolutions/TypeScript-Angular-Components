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
	private cardContainerController: CardContainerController;
	private searchFilter: __genericSearchFilter.IGenericSearchFilter;

	static $inject: string[] = ['$scope', '$timeout', '$element'];
	constructor($scope: angular.IScope
			, $timeout: angular.ITimeoutService
			, $element: angular.IAugmentedJQuery) {
		this.cardContainerController = $element.controller('rlCardContainer');
		this.searchFilter = <__genericSearchFilter.IGenericSearchFilter>this.cardContainerController.lookupFilter(__genericSearchFilter.filterName);

		if (this.searchFilter == null) {
			this.hasSearchFilter = false;
		} else {
			this.searchPlaceholder = defaultSearchPlaceholder;

			var dataSource: IDataSource<any> = this.cardContainerController.dataSource;

			var delay: number = this.delay != null
				? this.delay
				: defaultSearchDelay;

			var timer: angular.IPromise<void>;

			$scope.$watch((): string => { return this.searchText; }, (search: string): void => {
				this.searchFilter.searchText = search;
				this.minSearchLength = this.searchFilter.minSearchLength;

				this.validateSearchLength(search, this.minSearchLength);

				if (timer != null) {
					$timeout.cancel(timer);
				}

				timer = $timeout(dataSource.refresh, delay);
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
		require: '^^rlCardContainer',
		template: `
			<div class="input-group" ng-show="cardSearch.hasSearchFilter">
				<input class="form-control" type="text" placeholder="{{cardSearch.searchPlaceholder}}" ng-model="cardSearch.searchText"
					   popover="You must enter at least {{cardSearch.minSearchLength}} characters to perform a search" popover-trigger="mouseenter" popover-enable="cardSearch.searchLengthError" />
				<div class="input-group-btn">
					<button type="button" class="btn btn-default" ng-disabled="cardSearch.searchText | isEmpty" ng-click="cardSearch.searchText = null">
						<i class="fa fa-times"></i>
					</button>
				</div>
			</div>`,
		controller: controllerName,
		controllerAs: 'cardSearch',
		scope: {},
		bindToController: {
			delay: '=searchDelay',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, cardSearch)
	.controller(controllerName, CardSearchController);
