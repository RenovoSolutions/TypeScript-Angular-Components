// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='messageLog.service.ts' />
/// <reference path='messageLog.directive.ts' />
/// <reference path='editableMessageLog/editableMessageLog.ts' />

module rl.ui.components.messageLog {
	'use strict';

	export var moduleName: string = 'rl.ui.components.messageLog';

	angular.module(moduleName, [editableMessageLog.moduleName])
		.factory(factoryName, messageLogFactory)
		.directive(directiveName, messageLog)
		.controller(controllerName, MessageLogController);
}
