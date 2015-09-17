// uses typings/angularjs

// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='../dataSources/dataSource.ts' />
/// <reference path='../cardContainer.ts' />

module rl.ui.components.cardContainer.itemCount {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.itemCount';
	export var directiveName: string = 'rlItemCount';
	
	export interface IItemCountScope extends ng.IScope {
		source: dataSources.IDataSource<any>;
	}
	
	export function itemCount(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<p ng-show="!source.loadingDataSet">
					Showing <strong>{{source.dataSet.length}} of {{source.count}}</strong> total items
				</p>
			`,
			scope: true,
			link(scope: IItemCountScope
				, element: ng.IAugmentedJQuery
				, attrs: ng.IAttributes
				, cardContainerController: CardContainerController): void {
				scope.source = cardContainerController.dataSource;
			}
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, itemCount);
}
