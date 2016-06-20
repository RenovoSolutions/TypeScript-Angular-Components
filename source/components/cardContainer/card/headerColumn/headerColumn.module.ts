import * as angular from 'angular';

import { services, downgrade } from 'typescript-angular-utilities';

import { directiveName, headerColumn, controllerName, HeaderColumnController } from './headerColumn.ng1';
import { sizeForBreakpointsName, sizeForBreakpoints } from './sizeForBreakpoints.ng1';

export var moduleName: string = 'rl.ui.components.cardContainer.card.headerColumn';

angular.module(moduleName, [
	downgrade.moduleName,
])
	.directive(sizeForBreakpointsName, sizeForBreakpoints)
	.directive(directiveName, headerColumn)
	.controller(controllerName, HeaderColumnController);
