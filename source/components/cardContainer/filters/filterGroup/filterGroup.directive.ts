// /// <reference path='../../../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import { IDataSource } from '../../dataSources/dataSources.module';
import { IFilterGroup, IFilterOption } from './filterGroup.service';

export var directiveName: string = 'rlFilterGroup';
export var controllerName: string = 'FilterGroupController';

export interface IFilterGroupScope extends angular.IScope {
	icon: string;
	filterGroup: IFilterGroup;
	source: IDataSource<any>;
}

export class FilterGroupController {
	hasIcon: boolean;
	showChildren: boolean;

	static $inject: string[] = ['$scope'];
	constructor(private $scope: IFilterGroupScope) {
		this.hasIcon = $scope.icon != null && $scope.icon !== '';
		this.showChildren = true;
	}

	toggleChildren(): void {
		this.showChildren = !this.showChildren;
	}

	selectOption(option: IFilterOption): void {
		this.$scope.filterGroup.activeOption = option;
		this.showChildren = false;

		if (this.$scope.source != null) {
			this.$scope.source.refresh();
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
