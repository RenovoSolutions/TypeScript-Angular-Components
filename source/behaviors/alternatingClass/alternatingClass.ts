'use strict';

import * as angular from 'angular';

export const moduleName: string = 'rl.ui.behaviors.alternatingClass';
export const directiveName: string = 'rlAlternatingClass';
export const controllerName: string = 'AlternatingClassController';

export interface IAlternatingClassAttributes extends angular.IAttributes {
	rlAlternatingClass: string;
}

export class AlternatingClassController {
	static $inject: string[] = ['$scope', '$attrs'];
	constructor(private $scope: angular.IScope, private $attrs: IAlternatingClassAttributes) {}

	message: string;

	$onInit(): void {
		let index: number = this.checkForIndex(this.$scope);
		if (!(index % 2)) {
			this.$attrs.$addClass(this.$attrs.rlAlternatingClass);
		}
	}

	checkForIndex(scope: any): number {
		if (scope.$index == null && scope.$parent) {
			return this.checkForIndex(scope.$parent);
		} else {
			return scope.$index;
		}
	}
}

function alternatingClass(): angular.IDirective {
	return {
		restrict: 'A',
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, alternatingClass)
	.controller(controllerName, AlternatingClassController);
