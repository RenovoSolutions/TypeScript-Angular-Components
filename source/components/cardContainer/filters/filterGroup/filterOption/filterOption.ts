// /// <reference path='../../../../../../typings/commonjs.d.ts' />

'use strict';
import * as angular from 'angular';

export var moduleName: string = 'rl.ui.components.cardContainer.filters.filterGroup.filterOption';
export var componentName: string = 'rlFilterOption';

let filterOption: angular.IComponentOptions = {
	template: require('./filterOption.html'),
	bindings: {
		activate: '&',
		isActive: '=active',
		option: '=',
	},
};

angular.module(moduleName, [])
	.component(componentName, filterOption);
