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
		<span>
			<span ng-hide="controller.string | isEmpty">{{controller.string}}</span>
			<span ng-show="controller.string | isEmpty" class="watermark">{{controller.watermark}}</span>
		</span>
	`,
	controllerAs: 'controller',
	bindings: {
		string: '@',
		watermark: '@',
	},
};

angular.module(moduleName, [])
	.component(componentName, stringWithWatermark);
