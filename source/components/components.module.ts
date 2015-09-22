// /// <reference path='../../typings/angularjs/angular.d.ts' />

/// <reference path='autosaveComponent/autosaveComponent.ts' />
/// <reference path='autosaveDialogFooter/autosaveDialogFooter.ts' />
/// <reference path='busy/busy.ts' />
/// <reference path='button/button.ts' />
/// <reference path='cardContainer/cardContainer.module.ts' />
/// <reference path='buttonToggle/buttonToggle.ts' />
/// <reference path='dateTime/dateTime.ts' />
/// <reference path='genericContainer/genericContainer.ts' />
/// <reference path='lazyLoad/lazyLoad.ts' />
/// <reference path='longClickButton/longClickButton.ts' />
/// <reference path='messageLog/messageLog.module.ts' />
/// <reference path='multiStepIndicator/multiStepIndicator.ts' />
/// <reference path='ratingBar/ratingBar.ts' />
/// <reference path='simpleCardList/simpleCardList.module.ts' />
/// <reference path='userRating/userRating.ts' />

module rl.ui.components {
	export var moduleName: string = 'rl.ui.components';

	angular.module(moduleName, [
		// autosaveComponent.moduleName,
		autosaveDialogFooter.moduleName,
		busy.moduleName,
		button.moduleName,
		buttonToggle.moduleName,
		cardContainer.moduleName,
		dateTime.moduleName,
		genericContainer.moduleName,
		lazyLoad.moduleName,
		longClickButton.moduleName,
		messageLog.moduleName,
		multiStepIndicator.moduleName,
		ratingBar.moduleName,
		simpleCardList.moduleName,
		userRating.moduleName,
	]);
}
