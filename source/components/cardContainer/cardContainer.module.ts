'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;
import __array = services.array;
import __parentChild = services.parentChildBehavior;
import __genericSearchFilter = services.genericSearchFilter;

import * as card from './card/card';
import * as cardSearch from './cardSearch/cardSearch';
import * as columnHeader from './columnHeader/columnHeader';
import * as dataSources from './dataSources/dataSources.module';
import * as filters from './filters/filters.module';
import * as itemCount from './itemCount/itemCount';
import * as pager from './pager/pager';
import * as pageSize from './pageSize/pageSize';
import * as selectionControl from './selectionControl/selectionControl';
import * as sorts from './sorts/sorts.module';

import { directiveName, cardContainer, controllerName, CardContainerController } from './cardContainer';
import * as builder from './cardContainerBuilder.service';

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

export * from './cardContainer';
export * from './cardContainer.service';
export * from './column';

export var moduleName: string = 'rl.ui.components.cardContainer';

angular.module(moduleName, [
	// dependencies
	dataSources.dataPager.moduleName,
	__object.moduleName,
	__array.moduleName,
	__parentChild.moduleName,
	__genericSearchFilter.moduleName,

	// components
	card.moduleName,
	cardSearch.moduleName,
	columnHeader.moduleName,
	itemCount.moduleName,
	pager.moduleName,
	pageSize.moduleName,
	selectionControl.moduleName,

	// submodules
	dataSources.moduleName,
	filters.moduleName,
	sorts.moduleName,
])
	.directive(directiveName, cardContainer)
	.controller(controllerName, CardContainerController)
	.factory(builder.factoryName, builder.cardContainerBuilderFactory);
