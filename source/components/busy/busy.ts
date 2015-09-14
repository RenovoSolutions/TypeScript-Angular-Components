// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

module rl.ui.components.busy {
	'use strict';

	export var moduleName: string = 'rl.ui.components.busy';	
	export var directiveName: string = 'rlBusy';
	
	function busy(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: '<i class="fa fa-spin fa-spinner fa-{{size}}" ng-show="loading"></i>',
			scope: {
				loading: '=',
				// Valid values are:
				// `lg`, `2x`, `3x`, `4x`, and `5x`
				size: '@',
			},
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, busy);
}
