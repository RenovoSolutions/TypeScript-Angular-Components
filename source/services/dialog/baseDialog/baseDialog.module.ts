// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../typings/angular-ui-bootstrap/angular-ui-bootstrap.d.ts' />
// /// <reference path='../../../typings/lodash/lodash.d.ts' />

/// <reference path='baseDialog.controller.ts' />
/// <reference path='baseDialog.service.ts' />

module rl.ui.services.dialog.baseDialog {
	'use strict';

	export var moduleName: string = 'rl.ui.services.dialog.baseDialog';

	angular.module(moduleName, [])
		.controller(controllerName, BaseDialogController)
		.service(serviceName, BaseDialogService);
}
