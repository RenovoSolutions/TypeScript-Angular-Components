// /// <reference path='../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __boolean = services.boolean;

import { IDataSource } from '../dataSources/dataSources.module';
import { CardContainerBuilder } from '../cardContainerBuilder.service';

export var moduleName: string = 'rl.ui.components.cardContainer.selectionControl';
export var directiveName: string = 'rlSelectionControl';
export var controllerName: string = 'SelectionControlController';

export class SelectionControlController {
	selectedItems: number;
	pagingEnabled: boolean;
	dataSource: IDataSource<any>;
	private builder: CardContainerBuilder;

	static $inject: string[] = ['$scope', __boolean.serviceName];
	constructor(private $scope: angular.IScope
			, bool: __boolean.IBooleanUtility) {
		if (this.builder == null) {
			return;
		}

		this.selectedItems = this.builder._numberSelected;
		this.pagingEnabled = bool.toBool(this.builder._pager);
		this.dataSource = this.builder._dataSource;

		$scope.$watch((): number => { return this.builder._numberSelected; }, (value: number): void => {
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
		template: require('./selectionControl.html'),
		controller: controllerName,
		controllerAs: 'selection',
		scope: {},
		bindToController: {
			builder: '=',
		},
	};
}

angular.module(moduleName, [__boolean.moduleName])
	.directive(directiveName, selectionControl)
	.controller(controllerName, SelectionControlController);
