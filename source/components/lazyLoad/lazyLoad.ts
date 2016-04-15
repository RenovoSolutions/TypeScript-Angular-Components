'use strict';

import * as angular from 'angular';

import { IChangeObject } from '../../types/changes';

export const moduleName: string = 'rl.ui.components.lazyLoad';
export const componentName: string = 'rlLazyLoad';
export const controllerName: string = 'LazyLoadController';

export interface ILazyLoadChanges {
	show: IChangeObject<boolean>;
}

export class LazyLoadController {
	show: boolean;
	init: boolean = false;

	$onChanges(changes: ILazyLoadChanges): void {
		if (!this.init && changes.show && changes.show.currentValue) {
			this.init = true;
		}
	}
}

const lazyLoad: angular.IComponentOptions = {
	transclude: true,
	template: `
		<div ng-if="lazyLoad.init">
			Initialized
			<div ng-show="lazyLoad.show">
				<div ng-transclude></div>
			</div>
		</div>
	`,
	controller: controllerName,
	controllerAs: 'lazyLoad',
	bindings: {
		show: '<',
	},
};

angular.module(moduleName, [])
	.component(componentName, lazyLoad)
	.controller(controllerName, LazyLoadController);
