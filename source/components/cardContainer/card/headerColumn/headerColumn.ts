// uses typings/angularjs
// uses typings/jquery
// uses typescript-angular-utilities

// /// <reference path='../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='../../column.ts' />

module rl.ui.components.cardContainer.card.headerColumn {
	'use strict';
	
	export var directiveName: string = 'rlCardHeaderColumn';
	export var controllerName: string = 'CardHeaderColumnController';
	
	export interface IHeaderColumnBindings {
		column: IColumn;
		item: any;
	}
	
	export class HeaderColumnController {
		column: IColumn;
		item: any;
	
		value: string | number | boolean;
		
		renderedTemplate: JQuery;
	
		static $inject: string[] = ['$scope'];
		constructor(private $scope: ng.IScope) {
			this.update();
			$scope.$on('card.refresh', this.update); //*event?
		}
	
		private update: {(): void} = (): void => {
			this.value = this.column.getValue(this.item);
		}
	}
	
	headerColumn.$inject = ['$compile'];
	export function headerColumn($compile: ng.ICompileService): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<div size-for-breakpoints="column.size" title="{{::header.column.description}}">
					<div class="template-container" style="display: inline-block"></div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'header',
			scope: {},
			bindToController: {
				column: '=',
				item: '=',
			},
			compile(): ng.IDirectivePrePost {
				return {
					pre(scope: ng.IScope
						, element: ng.IAugmentedJQuery
						, attrs: ng.IAttributes
						, header: HeaderColumnController): void {
						var column: IColumn = header.column;
						if (column.templateUrl != null) {
							header.renderedTemplate = $compile('<div ng-include="\'' + column.templateUrl + '\'"></div>')(scope);
						} else if (column.template != null) {
							header.renderedTemplate = $compile(column.template)(scope);
						} else {
							header.renderedTemplate = $compile('<span>{{header.value}}</span>')(scope);
						}
					},
					post(scope: ng.IScope
						, element: ng.IAugmentedJQuery
						, attrs: ng.IAttributes
						, header: HeaderColumnController): void {
						var container: JQuery = element.find('.template-container');
						container.append(header.renderedTemplate);
					},
				};
			},
		};
	}
}