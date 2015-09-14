// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='autosaveComponent/autosaveComponent.ts' />
/// <reference path='autosaveDialogFooter/autosaveDialogFooter.ts' />
/// <reference path='busy/busy.ts' />
/// <reference path='button/button.ts' />
/// <reference path='buttonToggle/buttonToggle.ts' />
/// <reference path='userRating/userRating.ts' />

module rl.ui.components {
	export var moduleName: string = 'rl.ui.components';
	
	angular.module(moduleName, [
		// autosaveComponent.moduleName,
		autosaveDialogFooter.moduleName,
		busy.moduleName,
		button.moduleName,
		buttonToggle.moduleName,
		userRating.moduleName,		
	]);
}
