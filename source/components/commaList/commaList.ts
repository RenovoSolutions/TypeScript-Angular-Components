'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import __object = services.object;
import __transform = services.transform.transform;

export var moduleName: string = 'rl.ui.components.commaList';
export var directiveName: string = 'rlCommaList';
export var controllerName: string = 'CommaListController';

export class CommaListController {
	inList: any[];
	list: any[];
	transform: {(item: any): string} | string;
	max: number;
	remainingItems: number = 0;

	static $inject: string[] = [__object.serviceName];
	constructor(object: __object.IObjectUtility) {
		this.list = this.getFirstItems(this.inList);
	}

	private getFirstItems(list: any[]): any[] {
		if (this.transform != null) {
			list = _.map(list, (item: any): string => {
				return __transform.getValue(item, this.transform);
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
			transform: '=',
		},
	};
}

angular.module(moduleName, [__object.moduleName])
	.directive(directiveName, commaList)
	.controller(controllerName, CommaListController);
