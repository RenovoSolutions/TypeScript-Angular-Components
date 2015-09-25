'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __object = services.object;

export var moduleName: string = 'rl.ui.components.commaList';
export var directiveName: string = 'rlCommaList';
export var controllerName: string = 'CommaListController';

export interface ICommaListAttrs extends angular.IAttributes {
	transform: string;
}

export interface ITransformParam {
	item: any;
}

export class CommaListController {
	inList: any[];
	list: any[];
	transform: {(param: ITransformParam): string};
	hasTransform: boolean;
	max: number;
	remainingItems: number = 0;

	static $inject: string[] = ['$attrs', __object.serviceName];
	constructor($attrs: ICommaListAttrs, object: __object.IObjectUtility) {
		this.hasTransform = object.isNullOrWhitespace($attrs.transform) === false;
		this.list = this.getFirstItems(this.inList);
	}

	private getFirstItems(list: any[]): any[] {
		if (this.hasTransform) {
			list = _.map(list, (item: any): string => {
				return this.transform({ item: item });
			});
		};

		var newList: any[];

		if (this.max != null) {
			newList = _.take(list, this.max);

			this.remainingItems = list.length - this.max;
		} else {
			newList = _.clone(list);
		}
		return newList;
	}
}

function commaList(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<span>
				<span ng-repeat="item in commaList.list track by $index">
					<span>{{item}}</span><span ng-hide="$last">, </span>
				</span>
				<span ng-show="commaList.remainingItems > 0">... {{commaList.remainingItems}} more items</span>
			</span>
		`,
		controller: controllerName,
		controllerAs: 'commaList',
		scope: {},
		bindToController: {
			inList: '=list',
			max: '=',
			transform: '&',
		},
	};
}

angular.module(moduleName, [__object.moduleName])
	.directive(directiveName, commaList)
	.controller(controllerName, CommaListController);
