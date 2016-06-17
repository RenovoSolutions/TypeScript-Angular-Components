import * as angular from 'angular';

import { downgrade } from 'typescript-angular-utilities';

import { moduleName as parentChildModule } from '../../services/parentChild/parentChild.service';

import * as card from './card/card.ng1';
import * as cardSearch from './cardSearch/cardSearch.ng1';
import * as columnHeader from './columnHeader/columnHeader';
import * as dataSources from './dataSources/index';
import * as filters from './filters/filters.module';
import * as itemCount from './itemCount/itemCount.ng1';
import * as pager from './pager/pager.ng1';
import * as pageSize from './pageSize/pageSize.ng1';
import * as selectionControl from './selectionControl/selectionControl.ng1';
import * as sorts from './sorts/index';

import { componentName, cardContainer, controllerName, CardContainerController } from './cardContainer.ng1';
import * as builder from './cardContainerBuilder.service';
import { headerComponentName, footerComponentName, defaultContainerHeader, defaultContainerFooter } from './defaultComponents';

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
	.factory(builder.factoryName, builder.cardContainerBuilderFactory)
	.component(headerComponentName, defaultContainerHeader)
	.component(footerComponentName, defaultContainerFooter);
