// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as ng from 'angular';

import { TabsetController, ITabHeader } from './tabset';

export let componentName: string = 'rlTab';
export let controllerName: string = 'rlTabController';

export interface ITabScope extends ng.IScope {
	tabForm: ng.IFormController;
}

export class TabController {
	header: ITabHeader;

	tabset: TabsetController;

	static $inject: string[] = ['$scope', '$element', '$transclude'];
	constructor($scope: ng.IScope
			, private $element: ng.IAugmentedJQuery
			, private $transclude: ng.ITranscludeFunction) {
		$scope.$watch('tabForm.$valid', (isValid: boolean): void => {
			this.header.isValid = isValid != null ? isValid : true;
		});
	}

	$postLink(): void {
		this.$transclude((header: JQuery): void => {
			this.header = {
				template: header.html(),
				isValid: true,
			};
			this.tabset.registerTab(this.$element, this.header);
		}, null, 'headerSlot');
	}
}

export let tab: ng.IComponentOptions = {
	transclude: <any>{
		'headerSlot': '?rlTabHeader',
		'contentSlot': '?rlTabContent',
		'footerSlot': '?rlTabFooter',
	},
	require: { tabset:'^^rlTabset' },
	template: require('./tab.html'),
	controller: controllerName,
	controllerAs: 'tab',
};
