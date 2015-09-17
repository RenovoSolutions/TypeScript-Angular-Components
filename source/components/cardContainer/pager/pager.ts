// uses typings/angularjs
// uses typings/lodash

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/lodash/lodash.d.ts' />

/// <reference path='../dataSources/dataPager/dataPager.service.ts' />
/// <reference path='../dataSources/dataSource.ts' />
/// <reference path='../cardContainer.ts' />

module rl.ui.components.cardContainer.pager {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.pager';
	export var directiveName: string = 'rlPager';
	export var controllerName: string = 'PagerController';
	
	export var defaultVisiblePageCount: number = 5;
	
	export interface IPagerBindings {
		pageCount: number;
	}
	
	export class PagerController {
		// bindings
		pageCount: number;
		
		canGoBack: boolean = false;
		canGoForward: boolean = false;
		currentPage: number;
		pages: number[];
		hasPageFilter: boolean = true;
		private pager: dataSources.dataPager.IDataPager;
		private dataSource: dataSources.IDataSource<any>;
		private lastPage: number;
		private visiblePageCount: number;
	
		static $inject: string[] = ['$scope', '$element'];
		constructor($scope: ng.IScope
				, $element: ng.IAugmentedJQuery) {
			var cardContainerController: CardContainerController = $element.controller('rlCardContainer');
	
			this.pager = cardContainerController.pager;
	
			if (pager == null) {
				this.hasPageFilter = false;
			} else {
				this.visiblePageCount = this.pageCount != null ? this.pageCount : defaultVisiblePageCount;
				this.lastPage = 1;
				this.dataSource = cardContainerController.dataSource;
	
				$scope.$watch((): number => { return this.dataSource.count; }, this.updatePageCount);
				$scope.$watch((): number => { return this.pager.pageSize; }, this.updatePageCount);
	
				$scope.$watch((): number => { return this.currentPage; }, (page: number): void => {
					this.updatePaging();
	
					this.pager.pageNumber = page;
					this.dataSource.refresh();
				});
			}
		}
	
		private updatePageCount: {(): void} = (): void => {
			var totalItems: number = this.dataSource.count;
	
			var newLastPage: number = Math.ceil(totalItems / this.pager.pageSize);
	
			if (newLastPage !== this.lastPage) {
				this.lastPage = newLastPage;
				this.currentPage = 1;
			}
	
			this.updatePaging();
		}
	
		private updatePaging(): void {
			var page: number = this.currentPage;
			this.canGoBack = page > 1;
			this.canGoForward = page < this.lastPage;
	
			var nonCurrentVisiblePages: number = this.visiblePageCount - 1;
	
			var before: number = Math.floor(nonCurrentVisiblePages / 2);
			var after: number = Math.ceil(nonCurrentVisiblePages / 2);
	
			var startPage: number = page - before;
			var endPage: number = page + after;
	
			if (startPage < 1) {
				startPage = 1;
				endPage = Math.min(this.visiblePageCount, this.lastPage);
			} else if (endPage > this.lastPage) {
				endPage = this.lastPage;
				startPage = Math.max(this.lastPage - nonCurrentVisiblePages, 1);
			}
	
			this.pages = _.range(startPage, endPage + 1);
		}
	
		first(): void {
			this.currentPage = 1;
		}
	
		previous(): void {
			if (this.currentPage > 1) {
				this.currentPage--;
			}
		}
	
		goto(page: number): void {
			if (page >= 1 && page <= this.lastPage) {
				this.currentPage = page;
			}
		}
	
		next(): void {
			if (this.currentPage < this.lastPage) {
				this.currentPage++;
			}
		}
	
		last(): void {
			this.currentPage = this.lastPage;
		}
	}
	
	export function pager(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<nav ng-if="pager.hasPageFilter">
					<ul class="pagination">
						<li title="Go to first page" ng-click="pager.first()"
							ng-class="{ 'disabled': !pager.canGoBack }">
							<a><i class="fa fa-angle-double-left"></i></a>
						</li>
						<li title="Go to previous page" ng-click="pager.previous()"
							ng-class="{ 'disabled': !pager.canGoBack }">
							<a><i class="fa fa-angle-left"></i></a>
						</li>
						<li title="Go to page {{pager.page}}" ng-click="pager.goto(page)"
							ng-repeat="page in pager.pages"
							ng-class="{ 'active': pager.currentPage == page }">
							<a>{{page}}</a>
						</li>
						<li title="Go to next page" ng-click="pager.next()"
							ng-class="{ 'disabled': !pager.canGoForward }">
							<a><i class="fa fa-angle-right"></i></a>
						</li>
						<li title="Go to last page" ng-click="pager.last()"
							ng-class="{ 'disabled': !pager.canGoForward }">
							<a><i class="fa fa-angle-double-right"></i></a>
						</li>
					</ul>
				</nav>
			`,
			scope: {},
			bindToController: {
				pageCount: '=visiblePages',
			},
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, pager)
		.controller(controllerName, PagerController);
}
