// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { TabsetController, ITabHeader } from './tabset';

export let directiveName: string = 'rlTab';
export let controllerName: string = 'rlTabController';

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
		transclude: {
			'headerSlot': '?rlTabHeader',
			'contentSlot': '?rlTabContent',
			'footerSlot': '?rlTabFooter',
		},
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
			transclude((header: JQuery): void => {
				let tabset: TabsetController = controllers[0];
				let tab: TabController = controllers[1];
				tab.header = {
					template: header.html(),
					isValid: true,
				};
				tabset.registerTab(element, tab.header);
			}, null, 'headerSlot');
		},
	};
}
