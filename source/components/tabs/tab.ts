// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { TabsetController, ITabHeader } from './tabset';

export let directiveName: string = 'rlTab';
export let controllerName: string = 'TabController';

export interface ITabScope extends ng.IScope {
	hasFooter: boolean;
}

export class TabController {
	header: ITabHeader;
}

export function tab(): ng.IDirective {
	return {
		restrict: 'E',
		transclude: true,
		require: ['^^rlTabset', 'rlTab'],
		template: require('./tab.html'),
		controller: controllerName,
		controllerAs: 'tab',
		scope: {},
		bindToController: {

		},
		compile(): ng.IDirectivePrePost {
			let header: JQuery;
			let content: JQuery;
			let footer: JQuery;

			return {
				pre(scope: ITabScope
					, element: ng.IAugmentedJQuery
					, attrs: ng.IAttributes
					, controller: any
					, transclude: ng.ITranscludeFunction): void {
					transclude((clone: JQuery): void => {
						header = clone.filter('rl-tab-header');
						content = clone.filter('rl-tab-content');
						footer = clone.filter('rl-tab-footer');
					});
				},
				post(scope: ITabScope
					, element: ng.IAugmentedJQuery
					, attrs: ng.IAttributes
					, controllers: any[]): void {
					let tabset: TabsetController = controllers[0];
					let tab: TabController = controllers[1];
					tab.header = {
						template: header.html(),
					};
					tabset.registerTab(element, tab.header);

					let contentArea: JQuery = element.find('.tab-body');
					contentArea.append(content);

					scope.hasFooter = (footer.length > 0);
					if (scope.hasFooter) {
						let footerArea: JQuery = element.find('.tab-footer');
						footerArea.append(footer);
					}
				},
			};
		},
	};
}
