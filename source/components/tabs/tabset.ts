// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __array = services.array;

export let directiveName: string = 'rlTabset';
export let controllerName: string = 'rlTabsetController';

export interface ITabHeader {
	template: string;
	isVisible?: boolean;
	isValid?: boolean;
}

export class TabsetController {
	tabHeaders: ITabHeader[] = [];
	findPosition: { (tabElement: ng.IAugmentedJQuery): number };

	registerTab(element: ng.IAugmentedJQuery, header: ITabHeader): void {
		let index: number = this.findPosition(element);

		if (__array.arrayUtility.has(this.tabHeaders, index)) {
			header.isVisible = this.tabHeaders[index].isVisible;
		} else {
			header.isVisible = (index === 0);
		}

		this.tabHeaders[index] = header;
	}

	select(tab: ITabHeader): void {
		_.each(this.tabHeaders, (otherTab: ITabHeader): void => {
			otherTab.isVisible = false;
		});
		tab.isVisible = true;
	}
}

export function tabset(): ng.IDirective {
	return {
		restrict: 'E',
		transclude: true,
		template: require('./tabset.html'),
		controller: controllerName,
		controllerAs: 'tabset',
		scope: {},
		link: {
			pre(scope: ng.IScope
				, element: ng.IAugmentedJQuery
				, attrs: ng.IAttributes
				, tabset: TabsetController): void {
				tabset.findPosition = (tabElement: ng.IAugmentedJQuery): number => {
					// find the position of the specified element by iterating over the tabs and finding a matching element
					let tabs: ng.IAugmentedJQuery = element.find('rl-tab');
					let num: number;
					_.each(tabs, (elem: Element, index: number): boolean => {
						if (tabElement[0] === elem) {
							num = index;
							return false;
						}
					})
					return num;
				};
			},
		},
	};
}
