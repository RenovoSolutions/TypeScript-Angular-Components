// uses typings/angularjs

// /// <reference path='../../../typings/angularjs/angular.d.ts' />

module rl.ui.components.autosaveDialogFooter {
	'use strict';
	
	export var moduleName: string = 'rl.ui.components.autosaveDialogFooter';
	export var directiveName: string = 'rlAutosaveDialogFooter';
	
	function autosaveDialogFooter(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			templateUrl: 'components/autosaveDialogFooter/autosaveDialogFooter.html',
		};
	}
	
	angular.module(moduleName, [])
		.directive(directiveName, autosaveDialogFooter);
}
