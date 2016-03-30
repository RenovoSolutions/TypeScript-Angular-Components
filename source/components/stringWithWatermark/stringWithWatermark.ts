'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

export var moduleName: string = 'rl.ui.components.stringWithWatermark';
export var componentName: string = 'rlStringWithWatermark';
export var controllerName: string = 'StringWithWatermarkController';


export interface IStringWithWatermarkBindings {
	string: string;
	watermark: string;
}

export class StringWithWatermarkController implements IStringWithWatermarkBindings {
	// bindings
	string: string;
	watermark: string;

	hasString: boolean;

	static $inject: string[] = ['$scope', __object.serviceName];
	constructor($scope: angular.IScope, objectUtility: __object.IObjectUtility) {
		$scope.$watch((): string => { return this.string; }, (value: string): void => {
			this.hasString = objectUtility.isNullOrEmpty(value) === false;
		});
	}
}

let stringWithWatermark: angular.IComponentOptions = {
	template: `
		<span>
			<span ng-show="controller.hasString">{{controller.string}}</span>
			<span ng-hide="controller.hasString" class="watermark">{{controller.watermark}}</span>
		</span>
	`,
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		string: '@',
		watermark: '@',
	},
};

angular.module(moduleName, [__object.moduleName])
	.component(componentName, stringWithWatermark)
	.controller(controllerName, StringWithWatermarkController);
