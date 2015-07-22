// uses angularjs

/// <reference path='button/button.ts' />
/// <reference path='dialog/dialog.ts' />
/// <reference path='userRating/userRating.ts' />

module rl.components {
	export var moduleName: string = 'rl.components';

	angular.module(name, [
		button.moduleName,
		dialog.moduleName,
		userRating.moduleName,
	]);
}
