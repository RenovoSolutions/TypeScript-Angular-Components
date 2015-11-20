'use strict';

import * as angular from 'angular';

export let moduleName: string = 'rl.ui.behaviors.alias';
export let directiveName: string = 'rlAlias';
export let controllerName: string = 'AliasController';

export interface IAliasAttributes extends angular.IAttributes {
	rlAlias: string;
}

export class AliasController {
	static $inject: string[] = ['$scope', '$attrs', '$parse', '$interpolate'];
	constructor($scope: angular.IScope
			, $attrs: IAliasAttributes
			, $parse: angular.IParseService
			, $interpolate: angular.IInterpolateService) {
		let expression: string[];
		$scope.$watch((): any => {
			expression = $attrs.rlAlias.split(' as ');
			return $parse(expression[0])($scope);
		}, (item: any): void => {
			let alias: string = $interpolate(expression[1])($scope);
			if (alias != null) {
				$scope[alias] = item;
			}
		});
	}
}

export function alias(): angular.IDirective {
	return {
		restrict: 'A',
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, alias)
	.controller(controllerName, AliasController);
