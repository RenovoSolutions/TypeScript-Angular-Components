// /// <reference path='../../../../typings/commonjs.d.ts' />

import * as angular from 'angular';

import { IDataPager } from '../dataSources/index';
import { CardContainerController } from '../cardContainer.ng1';

export const moduleName: string = 'rl.ui.components.cardContainer.pageSize';
export const componentName: string = 'rlPageSize';
export const controllerName: string = 'PageSizeController';

export const availablePageSizes: number[] = [10, 25, 50, 100];
export const defaultPageSize: number = 10;

export class PageSizeController {
	pageSizes: number[];
	private cardContainer: CardContainerController;
	private pager: IDataPager;

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
