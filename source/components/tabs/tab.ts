// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

export let directiveName: string = 'rlTab';
export let controllerName: string = 'TabController';

export interface ITabScope extends ng.IScope {

}

export class TabController {

}

export function tab(): ng.IDirective {
	return {
		restrict: 'E',
		transclude: true,
		require: '^^rlTabs',
		template: require('./tab.html'),
		controller: controllerName,
		controllerAs: 'tab',
		scope: {},
		bindToController: {

		},
		compile(): ng.IDirectivePrePost {
			var header: JQuery;
			var content: JQuery;
			var footer: JQuery;

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
					, element: ng.IAugmentedJQuery): void {
					var contentArea: JQuery = element.find('.tab-body');
					contentArea.append(content);

					scope.hasFooter = (footer.length > 0);
					if (scope.hasFooter) {
						var footerArea: JQuery = element.find('.tab-footer');
						footerArea.append(footer);
					}
				},
			};
		},
	};
}
