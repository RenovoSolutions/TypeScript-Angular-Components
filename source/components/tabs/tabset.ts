// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';
import * as _ from 'lodash';

export let directiveName: string = 'rlTabset';
export let controllerName: string = 'TabsetController';

export interface ITabHeader {
	template: string;
	setVisibility(isVisible: boolean): void;
}

export class TabsetController {
	tabHeaders: ITabHeader[] = [];
	findPosition: { (tabElement: ng.IAugmentedJQuery): number };

	registerTab(element: ng.IAugmentedJQuery, header: string, setVisibility: {(isVisible: boolean): void}): void {
		let index: number = this.findPosition(element);
		this.tabHeaders[index] = {
			template: header,
			setVisibility: setVisibility,
		};
	}

	select(tab: ITabHeader): void {
		_.each(this.tabHeaders, (otherTab: ITabHeader): void => {
			otherTab.setVisibility(false);
		});
		tab.setVisibility(true);
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
