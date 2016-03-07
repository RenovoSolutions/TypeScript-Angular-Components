// /// <reference path='../../../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __transform = services.transform.transform;

import { IColumn } from '../../column';

export var directiveName: string = 'rlCardHeaderColumn';
export var controllerName: string = 'CardHeaderColumnController';

export interface IHeaderColumnBindings {
	column: IColumn<any>;
	item: any;
}

export class HeaderColumnController {
	column: IColumn<any>;
	item: any;

	value: string | number | boolean;

	renderedTemplate: JQuery;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) {
		this.update();
		$scope.$on('card.refresh', this.update); //*event?
	}

	private update: {(): void} = (): void => {
		this.value = __transform.getValue(this.item, this.column.getValue);
	}
}

headerColumn.$inject = ['$compile'];
export function headerColumn($compile: angular.ICompileService): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<div rl-size-for-breakpoints="header.column.size" title="{{::header.column.description}}">
				<div class="template-container"></div>
			</div>
		`,
		controller: controllerName,
		controllerAs: 'header',
		scope: {},
		bindToController: {
			column: '=',
			item: '=',
		},
		compile(): angular.IDirectivePrePost {
			return {
				pre(scope: angular.IScope
					, element: angular.IAugmentedJQuery
					, attrs: angular.IAttributes
					, header: HeaderColumnController): void {
					var column: IColumn<any> = header.column;
					if (column.templateUrl != null) {
						header.renderedTemplate = $compile('<div ng-include="\'' + column.templateUrl + '\'"></div>')(scope);
					} else if (column.template != null) {
						header.renderedTemplate = $compile(column.template)(scope);
					} else {
						header.renderedTemplate = $compile('<span>{{header.value}}</span>')(scope);
					}
				},
				post(scope: angular.IScope
					, element: angular.IAugmentedJQuery
					, attrs: angular.IAttributes
					, header: HeaderColumnController): void {
					var container: JQuery = element.find('.template-container');
					container.append(header.renderedTemplate);
				},
			};
		},
	};
}
