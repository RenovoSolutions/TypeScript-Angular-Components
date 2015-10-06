'use strict';

import * as angular from 'angular';

import { factoryName, messageLogFactory } from './messageLog.service';
import { controllerName, directiveName, messageLog, MessageLogController } from './messageLog.directive';
import {
	editableMessageLog,
	EditableMessageLogController,
	directiveName as editableMessageLogDirectieName,
	controllerName as editableMessageLogControllerName
} from './editableMessageLog';

export * from './messageLog.service';
export * from './messageLog.directive';

export var moduleName: string = 'rl.ui.components.messageLog';

angular.module(moduleName, [])
	.factory(factoryName, messageLogFactory)
	.directive(directiveName, messageLog)
	.controller(controllerName, MessageLogController)
	.directive(editableMessageLogDirectieName, editableMessageLog)
	.controller(editableMessageLogControllerName, EditableMessageLogController);
