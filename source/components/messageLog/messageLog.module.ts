import * as angular from 'angular';

import { downgrade } from 'typescript-angular-utilities';

import { moduleName as jqueryModuleName } from '../../services/jquery/jquery.service';

import { factoryName, messageLogFactory } from './messageLog.service';
import { controllerName, directiveName, messageLog, MessageLogController, DeletePermissions, EditPermissions } from './messageLog.directive';
import {
	editableMessageLog,
	EditableMessageLogController,
	directiveName as editableMessageLogDirectieName,
	controllerName as editableMessageLogControllerName
} from './editableMessageLog';

import * as componentServices from '../../services/services.module';
import __dialog = componentServices.dialog;

import { moduleName as templateLoaderModule } from '../../services/templateLoader/templateLoader.service';
import { moduleName as dateFilterModule } from '../../filters/date/date.filter';

export * from './messageLog.service';
export * from './messageLog.directive';

export var moduleName: string = 'rl.ui.components.messageLog';

angular.module(moduleName, [downgrade.moduleName, jqueryModuleName, templateLoaderModule, __dialog.moduleName, dateFilterModule])
	.factory(factoryName, messageLogFactory)
	.directive(directiveName, messageLog)
	.controller(controllerName, MessageLogController)
	.directive(editableMessageLogDirectieName, editableMessageLog)
	.controller(editableMessageLogControllerName, EditableMessageLogController);
