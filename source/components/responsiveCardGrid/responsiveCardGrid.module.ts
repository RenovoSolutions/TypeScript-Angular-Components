'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __parentChildBehavior = services.parentChildBehavior;
import __observable = services.observable;
import __promiseUtility = services.promise;
import __numberUtility = services.number;

import { moduleName as jqueryModuleName } from '../../services/jquery/jquery.service';

import * as grid from './responsiveCardGrid';
import * as card from './responsiveCard';

export { grid as responsiveCardGrid, card as responsiveCard };

export var moduleName: string = 'rl.ui.components.responsiveCardGrid';

angular.module(moduleName, [
	jqueryModuleName,
	__parentChildBehavior.moduleName,
	__observable.moduleName,
	__promiseUtility.moduleName,
	__numberUtility.moduleName,
])
	.directive(grid.directiveName, grid.responsiveCardGrid)
	.controller(grid.controllerName, grid.ResponsiveCardGridController)
	.directive(card.directiveName, card.responsiveCard)
	.controller(card.controllerName, card.ResponsiveCardController);
