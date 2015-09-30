'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __genericSearchFilter = services.genericSearchFilter;

import { IDataSource } from '../dataSources/dataSource';
import { ICardContainerService } from '../cardContainer';

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
	private containerService: ICardContainerService;
	private searchFilter: __genericSearchFilter.IGenericSearchFilter;

	static $inject: string[] = ['$scope', '$timeout'];
	constructor($scope: angular.IScope
			, $timeout: angular.ITimeoutService) {
		this.searchFilter = <__genericSearchFilter.IGenericSearchFilter>this.service.lookupFilter(__genericSearchFilter.filterName);

		if (this.searchFilter == null) {
			this.hasSearchFilter = false;
		} else {
			this.searchPlaceholder = defaultSearchPlaceholder;

			var dataSource: IDataSource<any> = this.containerService.dataSource;

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

				timer = $timeout<void>(dataSource.refresh.bind(dataSource), delay);
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
		template: require('./cardSearch.html'),
		controller: controllerName,
		controllerAs: 'cardSearch',
		scope: {},
		bindToController: {
			delay: '=searchDelay',
			containerService: '=',
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, cardSearch)
	.controller(controllerName, CardSearchController);
