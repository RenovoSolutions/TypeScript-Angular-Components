'use strict';

import * as angular from 'angular';

export let moduleName: string = 'rl.ui.components.lazyLoad';
export let componentName: string = 'rlLazyLoad';
export let controllerName: string = 'LazyLoadController';

export class LazyLoadController {
	show: boolean;
	init: boolean = false;

	static $inject: string[] = ['$scope'];
	constructor($scope: angular.IScope) {
		let unbind: Function = $scope.$watch((): boolean => { return this.show; }, (value: boolean): void => {
			if (value) {
				this.init = true;
				unbind();
			}
		});
	}
}

let lazyLoad: angular.IComponentOptions = {
	transclude: true,
	template: `
		<div ng-if="lazyLoad.init">
			<div ng-show="lazyLoad.show">
				<div ng-transclude></div>
			</div>
		</div>
	`,
	controller: controllerName,
	controllerAs: 'lazyLoad',
	bindings: {
		show: '=',
	},
};

angular.module(moduleName, [])
	.component(componentName, lazyLoad)
	.controller(controllerName, LazyLoadController);
