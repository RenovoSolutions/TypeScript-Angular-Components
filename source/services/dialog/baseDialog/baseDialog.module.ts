'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __promise = services.promise;

import { controllerName, BaseDialogController } from './baseDialog.controller';
import { serviceName, BaseDialogService } from './baseDialog.service';

export * from './baseDialog.controller';
export * from './baseDialog.service';

export var moduleName: string = 'rl.ui.services.dialog.baseDialog';

angular.module(moduleName, [__promise.moduleName])
	.controller(controllerName, BaseDialogController)
	.service(serviceName, BaseDialogService);
