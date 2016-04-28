'use strict';

import * as angular from 'angular';

import { downgrade } from 'typescript-angular-utilities';

import { controllerName, BootstrapModalDialogController } from './bootstrapModalDialog.controller';
import { serviceName, BootstrapModalDialogService } from './bootstrapModalDialog.service';

export * from './bootstrapModalDialog.controller';
export * from './bootstrapModalDialog.service';

export var moduleName: string = 'rl.ui.services.dialog.bootstrapModalDialog';

angular.module(moduleName, [downgrade.moduleName])
	.controller(controllerName, BootstrapModalDialogController)
	.service(serviceName, BootstrapModalDialogService);
