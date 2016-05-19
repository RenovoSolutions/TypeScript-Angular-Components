import * as angular from 'angular';

import { downgrade } from 'typescript-angular-utilities';

import {
	directiveName as radioGroupDirectiveName,
	radioGroup,
	controllerName as radioGroupControllerName,
	RadioGroupController
} from './radioGroup';
import {
	componentName as radioComponentName,
	radio,
	controllerName as radioControllerName,
	RadioController
} from './radio';

export {
	radioGroupDirectiveName,
	radioGroup,
	radioGroupControllerName,
	RadioGroupController,
	radioComponentName,
	radio,
	radioControllerName,
	RadioController,
};

export var moduleName: string = 'rl21.components.radio';

angular.module(moduleName, [downgrade.moduleName])
	.directive(radioGroupDirectiveName, radioGroup)
	.controller(radioGroupControllerName, RadioGroupController)
	.component(radioComponentName, radio)
	.controller(radioControllerName, RadioController);
