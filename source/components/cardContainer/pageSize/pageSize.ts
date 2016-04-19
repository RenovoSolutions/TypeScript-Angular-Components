// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { dataPager } from '../dataSources/dataSources.module';
import { CardContainerController } from '../cardContainer';

export const moduleName: string = 'rl.ui.components.cardContainer.pageSize';
export const componentName: string = 'rlPageSize';
export const controllerName: string = 'PageSizeController';

export const availablePageSizes: number[] = [10, 25, 50, 100];
export const defaultPageSize: number = 10;

export class PageSizeController {
	pageSizes: number[];
	private cardContainer: CardContainerController;
	private pager: dataPager.IDataPager;

	get selectedPageSize(): number {
		if (this.pager != null) {
			return this.pager.pageSize;
		}
		return null;
	}

	set selectedPageSize(value: number) {
		if (this.pager != null) {
			this.pager.pageSize = value;
		}
	}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.selectedPageSize = defaultPageSize;
		this.pageSizes = availablePageSizes;

		this.pager = this.cardContainer.dataSource.pager;
	}
}

const pageSize: angular.IComponentOptions = {
	require: { cardContainer: '?^^rlCardContainer' },
	template: require('./pageSize.html'),
	controller: controllerName,
	controllerAs: 'controller',
};

angular.module(moduleName, [])
	.component(componentName, pageSize)
	.controller(controllerName, PageSizeController);
