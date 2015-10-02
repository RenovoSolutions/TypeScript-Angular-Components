// /// <reference path='../../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import { IDataSource } from '../../dataSources/dataSources.module';
import { IFilterGroup, IFilterOption } from './filterGroup.service';

export var directiveName: string = 'rlFilterGroup';
export var controllerName: string = 'FilterGroupController';

export interface IFilterGroupBindings {
	icon: string;
	filterGroup: IFilterGroup;
	source: IDataSource<any>;
}

export class FilterGroupController {
	// bindings
	icon: string;
	filterGroup: IFilterGroup;
	source: IDataSource<any>;

	hasIcon: boolean;
	showChildren: boolean;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: angular.IScope) {
		this.hasIcon = this.icon != null && this.icon !== '';
		this.showChildren = true;
	}

	toggleChildren(): void {
		this.showChildren = !this.showChildren;
	}

	selectOption(option: IFilterOption): void {
		this.filterGroup.activeOption = option;
		this.showChildren = false;

		if (this.source != null) {
			this.source.refresh();
		} else {
			this.$scope.$emit('dataSource.requestRefresh'); //*event?
		}
	}
}

export function filterGroup(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./filterGroup.directive.html'),
		controller: controllerName,
		controllerAs: 'controller',
		scope: {},
		bindToController: {
			icon: '=',
			filterGroup: '=',
			source: '=',
		},
	};
}
