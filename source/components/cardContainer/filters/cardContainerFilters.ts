// /// <reference path='../../../typings/node/node.d.ts' />

import * as angular from 'angular';
import * as _ from 'lodash';

import { filters } from 'typescript-angular-utilities';
import { IDataSource } from '../dataSources/dataSource';
import { ITemplateObject } from '../../templateRenderer/templateRenderer.ng1';

export let moduleName: string = 'rl.ui.components.cardContainer.filters.cardContainerFilters';
export let componentName: string = 'rlCardContainerFilters';
export let controllerName: string = 'CardContainerFiltersController';

export interface IRenderableFilter extends filters.IFilter {
	template: string | ITemplateObject;
}

export interface IFilterScope extends angular.IScope {
	filter: filters.IFilter;
	dataSource: IDataSource<any>;
}

export interface ICardContainerFiltersBindings {
	filters: filters.IFilter[];
	source: IDataSource<any>;
}

export class CardContainerFiltersController implements ICardContainerFiltersBindings {
	filters: filters.IFilter[];
	source: IDataSource<any>;
	renderableFilters: IRenderableFilter[];

	static $inject: string[] = ['$rootScope'];
	constructor(private $rootScope: angular.IRootScopeService) { }

	$onInit(): void {
		this.renderableFilters = _(this.filters).filter((filter: IRenderableFilter): boolean => {
			return filter.template != null;
		}).map((filter: IRenderableFilter): IRenderableFilter => {
			let scope: IFilterScope = <IFilterScope>this.$rootScope.$new();
			scope.filter = filter;
			scope.dataSource = this.source;
			filter.template = {
				template: <string>filter.template,
				scope: scope,
			};
			return filter;
		}).value();
	}
}

let cardContainerFilters: angular.IComponentOptions = {
	template: require('./cardContainerFilters.html'),
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		filters: '<',
		source: '<',
	},
};

angular.module(moduleName, [])
	.component(componentName, cardContainerFilters)
	.controller(controllerName, CardContainerFiltersController);
