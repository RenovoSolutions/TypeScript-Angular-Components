'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __observable = services.observable;
import __parentChild = services.parentChildBehavior;

import * as card from './simpleCard';
import * as list from './simpleCardList';

export {
	card as simpleCard,
	list as simpleCardList,
};

export var moduleName: string = 'rl.ui.components.simpleCardList';


angular.module(moduleName, [__observable.moduleName, __parentChild.moduleName])
	.directive(list.directiveName, list.simpleCardList)
	.controller(list.controllerName, list.SimpleCardListController)
	.component(card.componentName, card.simpleCard)
	.controller(card.controllerName, card.SimpleCardController);
