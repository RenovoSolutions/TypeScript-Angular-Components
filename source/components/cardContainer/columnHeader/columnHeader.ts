// /// <reference path='../../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';

import { ISortDirections, SortDirection } from '../sorts/sortDirection';
import { IColumn } from '../column';

export var moduleName: string = 'rl.ui.components.cardContainer.columnHeader';
export var directiveName: string = 'rlColumnHeader';

export interface ICardColumnHeaderScope extends angular.IScope {
	column: IColumn;
	sorting: string;
	sort(): void;

	renderedTemplate: JQuery;
	sortDirection: ISortDirections;
}

cardColumnHeader.$inject = ['$compile'];
export function cardColumnHeader($compile: angular.ICompileService): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: '^^rlCardContainer',
		template: `
			<div rl-size-for-breakpoints="column.size" ng-click="sort()" title="{{::column.description}}"
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
		compile(): angular.IDirectivePrePost {
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
				post(scope: ICardColumnHeaderScope, element: angular.IAugmentedJQuery): void {
					if (scope.column.displayColumnHeader != null && scope.column.displayColumnHeader === false) {
						element.remove();
						return;
					}
					var container: JQuery = element.find('.template-container');
					container.append(scope.renderedTemplate);

					scope.sortDirection = SortDirection;

				},
			};
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, cardColumnHeader);
