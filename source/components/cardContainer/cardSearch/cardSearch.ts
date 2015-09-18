// uses typings/angularjs
// uses typings/jquery

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/jquery/jquery.d.ts' />

/// <reference path='../dataSources/dataSource.ts' />
/// <reference path='../cardContainer.ts' />

module rl.ui.components.cardContainer.cardSearch {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.cardSearch';
	export var directiveName: string = 'rlCardSearch';
	export var controllerName: string = 'CardSearchController';
	
	export var defaultSearchPlaceholder: string = 'Search';
	export var defaultSearchDelay: number = 1000;
	
	import __genericSearchFilter = rl.utilities.services.genericSearchFilter;
	
	export interface ICardSearchBindings {
		delay: number;
	}
	
	export class CardSearchController {
		// bindings
		delay: number;
		
		searchPlaceholder: string;
		searchText: string;
		hasSearchFilter: boolean = true;
		private cardContainerController: CardContainerController;
		private searchFilter: __genericSearchFilter.IGenericSearchFilter;
	
		static $inject: string[] = ['$scope', '$timeout', '$element'];
		constructor($scope: ng.IScope
				, $timeout: ng.ITimeoutService
				, $element: ng.IAugmentedJQuery) {
			this.cardContainerController = $element.controller('rlCardContainer');
			this.searchFilter = <__genericSearchFilter.IGenericSearchFilter>this.cardContainerController.lookupFilter(__genericSearchFilter.filterName);
	
			if (this.searchFilter == null) {
				this.hasSearchFilter = false;
			} else {
				this.searchPlaceholder = defaultSearchPlaceholder;
	
				var dataSource: dataSources.IDataSource<any> = this.cardContainerController.dataSource;
	
				var delay: number = this.delay != null
					? this.delay
					: defaultSearchDelay;
	
				var timer: ng.IPromise<void>;
	
				$scope.$watch((): string => { return this.searchText; }, (search: string): void => {
					this.searchFilter.searchText = search;
	
					if (timer != null) {
						$timeout.cancel(timer);
					}
	
					timer = $timeout(dataSource.refresh, delay);
				});
			}
		}
	}
	
	export function cardSearch(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<div class="input-group" ng-show="cardSearch.hasSearchFilter">
					<input class="form-control" type="text" placeholder="{{cardSearch.searchPlaceholder}}" ng-model="cardSearch.searchText" />
					<div class="input-group-btn">
						<button type="button" class="btn btn-default" ng-disabled="cardSearch.searchText | isEmpty" ng-click="cardSearch.searchText = null">
							<i class="fa fa-times"></i>
						</button>
					</div>
				</div>

			`,
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
}
