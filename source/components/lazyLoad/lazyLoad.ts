// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

module rl.ui.components.lazyLoad {
	'use strict';

	export var moduleName: string = 'rl.ui.components.lazyLoad';	
	export var directiveName: string = 'rlLazyLoad';
	export var controllerName: string = 'LazyLoadController';
	
	export class LazyLoadController {
		show: boolean;
		init: boolean = false;
	
		static $inject: string[] = ['$scope'];
		constructor($scope: ng.IScope) {
			var unbind: Function = $scope.$watch((): boolean => { return this.show; }, (value: boolean): void => {
				if (value) {
					this.init = true;
					unbind();
				}
			});
		}
	}
	
	function lazyLoad(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: `
				<div ng-if="lazyLoad.init">
					<div ng-show="lazyLoad.show">
						<div ng-transclude></div>
					</div>
				</div>
			`,
			controller: controllerName,
			controllerAs: 'lazyLoad',
			scope: {},
			bindToController: {
				show: '=',
			},
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, lazyLoad)
		.controller(controllerName, LazyLoadController);
}
