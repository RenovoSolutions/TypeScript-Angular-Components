// uses typings/angularjs
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../dataSources/dataSource.ts' />
/// <reference path='../cardContainer.ts' />

module rl.ui.components.cardContainer.selectionControl {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.selectionControl';
	export var directiveName: string = 'rlCardContainer';
	export var controllerName: string = 'CardContainerController';
	
	import __boolean = rl.utilities.services.boolean;
	
	export class SelectionControlController {
		selectedItems: number;
		pagingEnabled: boolean;
		dataSource: dataSources.IDataSource<any>;
		private cardContainerController: CardContainerController;
	
		static $inject: string[] = ['$scope', '$element', __boolean.serviceName];
		constructor(private $scope: ng.IScope
				, $element: ng.IAugmentedJQuery
				, bool: __boolean.IBooleanUtility) {
			this.cardContainerController = $element.controller('rlCardContainer');
			this.selectedItems = this.cardContainerController.numberSelected;
			this.pagingEnabled = bool.toBool(this.cardContainerController.pager);
			this.dataSource = this.cardContainerController.dataSource;
	
			$scope.$watch((): number => { return this.cardContainerController.numberSelected; }, (value: number): void => {
				this.selectedItems = value;
			});
		}
	
		selectPage(): void {
			_.each(this.dataSource.dataSet, (item: any): void => {
				item.viewData.selected = true;
			});
	
			this.$scope.$emit('selectionChanged'); //*events?
		}
	
		selectAll(): void {
			_.each(this.dataSource.filteredDataSet, (item: any): void => {
				item.viewData.selected = true;
			});
	
			this.$scope.$emit('selectionChanged'); //*events?
		}
	
		clearPage(): void {
			_.each(this.dataSource.dataSet, (item: any): void => {
				item.viewData.selected = false;
			});
	
			this.$scope.$emit('selectionChanged'); //*events?
		}
	
		clearAll(): void {
			_.each(this.dataSource.filteredDataSet, (item: any): void => {
				item.viewData.selected = false;
			});
	
			this.$scope.$emit('selectionChanged'); //*events?
		}
	}
	
	export function selectionControl(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<div>
					<div style="margin-bottom: 5px">
						<span><strong>{{selection.selectedItems}}</strong> items selected</span>
					</div>
					<div style="margin-bottom: 5px" ng-if="selection.pagingEnabled">
						<button type="button" class="btn btn-default" ng-click="selection.selectPage()">Select page</button>
						<button type="button" class="btn btn-default" ng-click="selection.clearPage()">Clear page</button>
					</div>
					<div>
						<button type="button" class="btn btn-default" ng-click="selection.selectAll()">Select all</button>
						<button type="button" class="btn btn-default" ng-click="selection.clearAll()">Clear all</button>
					</div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'selection',
		};
	}
	
	angular.module(moduleName, [__boolean.moduleName])
		.directive(directiveName, selectionControl)
		.controller(controllerName, SelectionControlController);
}
