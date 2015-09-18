// uses typings/angularjs
// uses typings/lodash
// uses typescript-angular-utilities

// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../../dataSources/dataSource.ts' />
/// <reference path='filterGroup.service.ts' />

module rl.ui.components.cardContainer.filters.filterGroup {
	'use strict';

	export var directiveName: string = 'rlFilterGroup';
	export var controllerName: string = 'FilterGroupController';

	export interface IFilterGroupScope extends ng.IScope {
		icon: string;
		filterGroup: IFilterGroup;
		source: dataSources.IDataSource<any>;
	}
	
	export class FilterGroupController {
		hasIcon: boolean;
		showChildren: boolean;
	
		static $inject: string[] = ['$scope'];
		constructor(private $scope: IFilterGroupScope) {
			this.hasIcon = $scope.icon != null && $scope.icon !== '';
			this.showChildren = true;
		}
	
		toggleChildren(): void {
			this.showChildren = !this.showChildren;
		}
	
		selectOption(option: IFilterOption): void {
			this.$scope.filterGroup.activeOption = option;
			this.showChildren = false;
	
			if (this.$scope.source != null) {
				this.$scope.source.refresh();
			} else {
				this.$scope.$emit('dataSource.requestRefresh'); //*event?
			}
		}
	}
	
	export function filterGroup(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<div class="filter-group">
					<div class="row filter-header" ng-click="controller.toggleChildren()">
						<div class="col-sm-12">
							<i class="collapse-icon fa fa-caret-down fa-2x" ng-show="controller.showChildren" title="Hide filter list"></i>
							<i class="collapse-icon fa fa-caret-right fa-2x" ng-hide="controller.showChildren" title="Show filter list"></i>
							<div class="filter-option">
								<div style="display:inline-block" ng-show="controller.hasIcon" ng-bind-html="controller.icon"></div>
								<h4 style="display: inline-block">{{controller.filterGroup.label}}: {{controller.filterGroup.activeOption.label}}</h4>
							</div>
						</div>
					</div>
					<div ng-show="controller.showChildren" ng-repeat="filterOption in controller.filterGroup.options">
						<rl-filter-option option="filterOption" active="filterGroup.activeOption === filterOption" activate="controller.selectOption(filterOption)"></rl-filter-option>
					</div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'controller',
			scope: {},
			bindToController: {
				icon: '=',
				filterGroup: '=',
				source: '=',
			},
		};
	}
}
