// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { IDataSource } from '../dataSources/dataSources.module';
import { CardContainerController } from '../cardContainer';

export var moduleName: string = 'rl.ui.components.cardContainer.selectionControl';
export var directiveName: string = 'rlSelectionControl';
export var controllerName: string = 'SelectionControlController';

export class SelectionControlController {
	selectedItems: number;
	pagingEnabled: boolean;
	dataSource: IDataSource<any>;
	private cardContainer: CardContainerController;

	static $inject: string[] = ['$scope', __boolean.serviceName];
	constructor(private $scope: angular.IScope
			, private bool: __boolean.IBooleanUtility) {}

	$onInit(): void {
		if (this.cardContainer == null) {
			return;
		}

		this.selectedItems = this.cardContainer.numberSelected;
		this.pagingEnabled = this.bool.toBool(this.cardContainer.dataSource.pager);
		this.dataSource = this.cardContainer.dataSource;

		this.$scope.$watch((): number => { return this.cardContainer.numberSelected; }, (value: number): void => {
			this.selectedItems = value;
		});
	}

	selectPage(): void {
		_.each(this.dataSource.dataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		this.$scope.$emit('selectionChanged'); //*events?
	}

	selectAll(): void {
		_.each(this.dataSource.filteredDataSet, (item: any): void => {
			item.viewData.selected = true;
		});

		this.$scope.$emit('selectionChanged'); //*events?
	}

	clearPage(): void {
		_.each(this.dataSource.dataSet, (item: any): void => {
			item.viewData.selected = false;
		});

		this.$scope.$emit('selectionChanged'); //*events?
	}

	clearAll(): void {
		_.each(this.dataSource.filteredDataSet, (item: any): void => {
			item.viewData.selected = false;
		});

		this.$scope.$emit('selectionChanged'); //*events?
	}
}

export function selectionControl(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: { cardContainer: '^^rlCardContainer' },
		template: require('./selectionControl.html'),
		controller: controllerName,
		controllerAs: 'selection',
		scope: {},
		bindToController: {},
	};
}

angular.module(moduleName, [__boolean.moduleName])
	.directive(directiveName, selectionControl)
	.controller(controllerName, SelectionControlController);
