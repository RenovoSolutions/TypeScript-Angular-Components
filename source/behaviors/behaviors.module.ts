// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='autosave/autosave.ts' />

module rl.ui.behaviors {
	export var moduleName: string = 'rl.ui.behaviors';
	
	angular.module(moduleName, [
		autosave.moduleName,
	]);
}
