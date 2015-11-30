'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import { moduleName as autosaveModuleName } from '../autosave/autosave.service';

import { serviceName, AutosaveDialogService } from './autosaveDialog.service';
import { controllerName, AutosaveDialogController } from './autosaveDialog.controller';

export * from './autosaveDialog.service';
export * from './autosaveDialog.controller';

export var moduleName: string = 'rl.ui.services.autosaveDialog';

angular.module(moduleName, [__promise.moduleName, autosaveModuleName])
	.service(serviceName, AutosaveDialogService)
	.controller(controllerName, AutosaveDialogController);
