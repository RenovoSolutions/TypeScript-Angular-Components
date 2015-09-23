// /// <reference path='../../../typings/angularjs/angular.d.ts' />

/// <reference path='autosaveDialog.service.ts' />
/// <reference path='autosaveDialog.controller.ts' />

module rl.ui.services.autosaveDialog {
	'use strict';

	export var moduleName: string = 'rl.ui.services.autosaveDialog';

	angular.module(moduleName, [])
		.service(serviceName, AutosaveDialogService)
		.controller(controllerName, AutosaveDialogController);
}
