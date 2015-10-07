'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import {
	directiveName as radioGroupDirectiveName,
	radioGroup,
	controllerName as radioGroupControllerName,
	RadioGroupController
} from './radioGroup';
import {
	directiveName as radioDirectiveName,
	radio,
	controllerName as radioControllerName,
	RadioController
} from './radio';

export {
	radioGroupDirectiveName,
	radioGroup,
	radioGroupControllerName,
	RadioGroupController,
	radioDirectiveName,
	radio,
	radioControllerName,
	RadioController,
};

export var moduleName: string = 'rl21.components.radio';

angular.module(moduleName, [__object.moduleName])
	.directive(radioGroupDirectiveName, radioGroup)
	.controller(radioGroupControllerName, RadioGroupController)
	.directive(radioDirectiveName, radio)
	.controller(radioControllerName, RadioController);
