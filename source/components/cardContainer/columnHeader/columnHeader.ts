// uses typings/angularjs
// uses typings/jquery

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/jquery/jquery.d.ts' />

/// <reference path='../sorts/sortDirection.ts' />
/// <reference path='../column.ts' />

module rl.ui.components.cardContainer.columnHeader {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.cardContainer.columnHeader';
	export var directiveName: string = 'rlColumnHeader';
	
	export interface ICardColumnHeaderScope extends ng.IScope {
		column: IColumn;
		sorting: string;
		sort(): void;
	
		renderedTemplate: JQuery;
		sortDirection: sorts.ISortDirections;
	}
	
	cardColumnHeader.$inject = ['$compile'];
	export function cardColumnHeader($compile: ng.ICompileService): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			require: '^^rlCardContainer',
			template: `
				<div size-for-breakpoints="column.size" ng-click="sort()" title="{{::column.description}}"
					 class="column-header">
					<div class="template-container" style="display: inline-block"></div>
					<i ng-show="sorting === sortDirection.ascending" class="fa fa-sort-asc"></i>
					<i ng-show="sorting === sortDirection.descending" class="fa fa-sort-desc"></i>
				</div>
			`,
			scope: {
				column: '=',
				sorting: '=',
				sort: '&',
			},
			compile(): ng.IDirectivePrePost {
				return {
					pre(scope: ICardColumnHeaderScope): void {
						var column: IColumn = scope.column;
						if (column.headerTemplateUrl != null) {
							scope.renderedTemplate = $compile('<div ng-include="\'' + column.headerTemplateUrl + '\'"></div>')(scope);
						} else if (column.headerTemplate != null) {
							scope.renderedTemplate = $compile(column.headerTemplate)(scope);
						} else {
							scope.renderedTemplate = <any>('<h5>' + column.label + '</h5');
						}
					},
					post(scope: ICardColumnHeaderScope, element: ng.IAugmentedJQuery): void {
						var container: JQuery = element.find('.template-container');
						container.append(scope.renderedTemplate);
	
						scope.sortDirection = sorts.SortDirection;
					},
				};
			}
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, cardColumnHeader);
}
