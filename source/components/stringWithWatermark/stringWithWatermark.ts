'use strict';

import * as angular from 'angular';

export const moduleName: string = 'rl.ui.components.stringWithWatermark';
export const componentName: string = 'rlStringWithWatermark';

export interface IStringWithWatermarkBindings {
	string: string;
	watermark: string;
}

const stringWithWatermark: angular.IComponentOptions = {
	template: `
		<rl-generic-container selector="controller.string | isEmpty">
			<template when-selector="true"><span class="watermark">{{controller.watermark}}</span></template>
			<template default><span>{{controller.string}}</span></template>
		</rl-generic-container>
	`,
	controllerAs: 'controller',
	bindings: {
		string: '@',
		watermark: '@',
	},
};

angular.module(moduleName, [])
	.component(componentName, stringWithWatermark);
