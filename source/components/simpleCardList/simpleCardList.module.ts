import * as angular from 'angular';

import {  downgrade } from 'typescript-angular-utilities';
import {moduleName as parentChildModuleName } from '../../services/parentChild/parentChild.service';
import * as card from './simpleCard.ng1';
import * as list from './simpleCardList.ng1';

export {
	card as simpleCard,
	list as simpleCardList,
};

export var moduleName: string = 'rl.ui.components.simpleCardList';


angular.module(moduleName, [downgrade.moduleName, parentChildModuleName])
	.directive(list.directiveName, list.simpleCardList)
	.controller(list.controllerName, list.SimpleCardListController)
	.component(card.componentName, card.simpleCard)
	.controller(card.controllerName, <any>card.SimpleCardController);
