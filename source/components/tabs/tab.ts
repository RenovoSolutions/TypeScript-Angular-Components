// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { TabsetController, ITabHeader } from './tabset';

export let directiveName: string = 'rlTab';
export let controllerName: string = 'TabController';

export interface ITabScope extends ng.IScope {
	tabForm: ng.IFormController;
	hasFooter: boolean;
}

export class TabController {
	header: ITabHeader;

	static $inject: string[] = ['$scope'];
	constructor($scope: ng.IScope) {
		$scope.$watch('tabForm.$valid', (isValid: boolean): void => {
			this.header.isValid = isValid != null ? isValid : true;
		});
	}
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
		bindToController: {},
		link(scope: ITabScope
			, element: ng.IAugmentedJQuery
			, attrs: ng.IAttributes
			, controllers: any[]
			, transclude: ng.ITranscludeFunction): void {
			transclude((clone: JQuery): void => {
				let header: JQuery = clone.filter('rl-tab-header');
				let content: JQuery = clone.filter('rl-tab-content');
				let footer: JQuery = clone.filter('rl-tab-footer');

				let tabset: TabsetController = controllers[0];
				let tab: TabController = controllers[1];
				tab.header = {
					template: header.html(),
					isValid: true,
				};
				tabset.registerTab(element, tab.header);

				let contentArea: JQuery = element.find('.content-template');
				contentArea.append(content);

				scope.hasFooter = (footer.length > 0);
				if (scope.hasFooter) {
					let footerArea: JQuery = element.find('.footer-template');
					footerArea.append(footer);
				}
			});
		},
	};
}
