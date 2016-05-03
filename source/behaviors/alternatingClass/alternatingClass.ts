'use strict';

import * as angular from 'angular';

export const moduleName: string = 'rl.ui.behaviors.alternatingClass';
export const directiveName: string = 'rlAlternatingClass';
export const controllerName: string = 'AlternatingClassController';

export interface IAlternatingClassAttributes extends angular.IAttributes {
	rlAlternatingClass: string;
	class: string;
}

export class AlternatingClassController {
	static $inject: string[] = ['$scope', '$attrs'];
	constructor(private $scope: angular.IScope, private $attrs: IAlternatingClassAttributes) {}

	message: string;

	$onInit(): void {
		const odd: boolean = this.checkForOdd(this.$scope);
		// angular appears to set $odd on the odd indexed items. We want to set the class on the even ones instead.
		if (odd === false) {
			this.$attrs.$set('class', this.$attrs.class + ' ' + this.$attrs.rlAlternatingClass);
		}
	}

	checkForOdd(scope: any): boolean {
		if (scope.$odd == null && scope.$parent) {
			return this.checkForOdd(scope.$parent);
		} else {
			return scope.$odd;
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
