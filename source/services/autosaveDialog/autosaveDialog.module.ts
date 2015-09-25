'use strict';

import * as angular from 'angular';

import { serviceName, AutosaveDialogService } from './autosaveDialog.service';
import { controllerName, AutosaveDialogController } from './autosaveDialog.controller';

export * from './autosaveDialog.service';
export * from './autosaveDialog.controller';

export var moduleName: string = 'rl.ui.services.autosaveDialog';

angular.module(moduleName, [])
	.service(serviceName, AutosaveDialogService)
	.controller(controllerName, AutosaveDialogController);
