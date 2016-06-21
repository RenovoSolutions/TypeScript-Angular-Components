import * as angular from 'angular';

import { downgrade } from 'typescript-angular-utilities';

import { moduleName as parentChildModule } from '../../services/parentChild/parentChild.service';

import * as card from './card/card.ng1';
import * as cardSearch from './container/cardSearch/cardSearch.ng1';
import * as columnHeader from './container/columnHeader/columnHeader.ng1';
import * as dataSources from './dataSources/index';
import * as filters from './filters/filters.module';
import * as itemCount from './container/itemCount/itemCount.ng1';
import * as pager from './paging/pager/pager.ng1';
import * as pageSize from './paging/pageSize/pageSize.ng1';
import * as selectionControl from './container/selectionControl/selectionControl.ng1';
import * as sorts from './sorts/index';

import { componentName, cardContainer, controllerName, CardContainerController } from './cardContainer.ng1';
import * as builder from './builder/cardContainerBuilder.service';
import { headerComponentName, footerComponentName, defaultContainerHeader, defaultContainerFooter } from './container/defaultComponents';

export {
	builder,
	card,
	cardSearch,
	columnHeader,
	dataSources,
	filters,
	itemCount,
	pager,
	pageSize,
	selectionControl,
	sorts,
};

export * from './cardContainer.ng1';
export * from './column';

export var moduleName: string = 'rl.ui.components.cardContainer';

angular.module(moduleName, [
	// dependencies
	downgrade.moduleName,
	parentChildModule,

	// components
	card.moduleName,
	cardSearch.moduleName,
	columnHeader.moduleName,
	itemCount.moduleName,
	pager.moduleName,
	pageSize.moduleName,
	selectionControl.moduleName,

	// submodules
	filters.moduleName,
])
	.component(componentName, cardContainer)
	.controller(controllerName, CardContainerController)
	.component(headerComponentName, defaultContainerHeader)
	.component(footerComponentName, defaultContainerFooter);
