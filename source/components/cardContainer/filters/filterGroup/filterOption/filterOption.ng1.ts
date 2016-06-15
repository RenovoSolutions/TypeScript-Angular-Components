// /// <reference path='../../../../../../typings/commonjs.d.ts' />

import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
export var componentName: string = 'rlFilterOption';

let filterOption: angular.IComponentOptions = {
	template: require('./filterOption.ng1.html'),
	controllerAs: 'filter',
	bindings: {
		activate: '&',
		isActive: '=active',
		option: '=',
	},
};

angular.module(moduleName, [])
	.component(componentName, filterOption);
