// /// <reference path='../../../../typings/commonjs.d.ts' />

import * as angular from 'angular';
import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { IDataSourceOld } from '../../dataSources/index';
import { CardContainerController } from '../../cardContainer.ng1';

export var moduleName: string = 'rl.ui.components.cardContainer.selectionControl';
export var componentName: string = 'rlSelectionControl';
export var controllerName: string = 'SelectionControlController';

export class SelectionControlController {
	selectedItems: number;
	pagingEnabled: boolean;
	dataSource: IDataSourceOld<any>;
	private cardContainer: CardContainerController;

	static $inject: string[] = [downgrade.booleanServiceName];
	constructor(private bool: __boolean.IBooleanUtility) {}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.selectedItems = this.cardContainer.numberSelected;
		this.pagingEnabled = this.bool.toBool(this.cardContainer.dataSource.pager);
		this.dataSource = this.cardContainer.dataSource;

		this.cardContainer.numberSelectedChanges.subscribe((value: number): void => {
			this.selectedItems = value;
		});
	}

	selectPage(): void {
		_.each(this.dataSource.dataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		this.cardContainer.selectionChanged();
	}

	selectAll(): void {
		_.each(this.dataSource.filteredDataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		this.cardContainer.selectionChanged();
	}

	clearPage(): void {
		_.each(this.dataSource.dataSet, (item: any): void => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged();
	}

	clearAll(): void {
		_.each(this.dataSource.filteredDataSet, (item: any): void => {
			item.viewData.selected = false;
		});

		this.cardContainer.selectionChanged();
	}
}

let selectionControl: angular.IComponentOptions = {
	require: { cardContainer: '?^^rlCardContainer' },
	template: require('./selectionControl.ng1.html'),
	controller: controllerName,
	controllerAs: 'selection',
};

angular.module(moduleName, [downgrade.moduleName])
	.component(componentName, selectionControl)
	.controller(controllerName, SelectionControlController);
