// uses typings/angularjs
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSources/dataPager/dataPager.service.ts' />
/// <reference path='../cardContainer.ts' />

module rl.ui.components.cardContainer.pageSize {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.pageSize';
	export var directiveName: string = 'rlPageSize';
	export var controllerName: string = 'PageSizeController';
	
	export var availablePageSizes: number[] = [10, 25, 50, 100];
	export var defaultPageSize: number = 10;
	
	export class PageSizeController {
		selectedPageSize: number;
		pageSizes: number[];
		hasPageFilter: boolean;
		private cardContainerController: CardContainerController;
	
		static $inject: string[] = ['$scope', '$element'];
		constructor($scope: ng.IScope
				, $element: ng.IAugmentedJQuery) {
			this.selectedPageSize = defaultPageSize;
			this.pageSizes = availablePageSizes;
			this.hasPageFilter = true;
			this.cardContainerController = $element.controller('rlCardContainer');
	
			var pager: dataSources.dataPager.IDataPager = this.cardContainerController.pager;
	
			if (pager == null) {
				this.hasPageFilter = false;
			} else {
				$scope.$watch((): number => { return this.selectedPageSize; }, (newPageSize: number): void => {
					if (pager != null) {
						pager.pageSize = newPageSize;
						this.cardContainerController.dataSource.refresh();
					}
				});
			}
		}
	}
	
	export function pageSize(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<div ng-show="controller.hasPageFilter">
					<select class="form-control" title="Cards per page" ng-model="controller.selectedPageSize"
							ng-options="pageSize for pageSize in controller.pageSizes"></select>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'controller',
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, pageSize)
		.controller(controllerName, PageSizeController);
}
