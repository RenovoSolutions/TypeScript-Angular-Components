'use strict';

import * as angular from 'angular';

export const moduleName: string = 'rl.ui.behaviors.required';
export const directiveName: string = 'rlRequired';
export const controllerName: string = 'RequiredController';

export interface IRequiredAttributes extends angular.IAttributes {
	rlRequired: string;
}

export class RequiredController {
	static $inject: string[] = ['$scope', '$attrs', '$interpolate'];
	constructor(private $scope: angular.IScope
				, private $attrs: IRequiredAttributes
				, private $interpolate: angular.IInterpolateService) {
		this.message = this.$interpolate(this.$attrs.rlRequired)(this.$scope);
	}

	message: string;
}

function required(): angular.IDirective {
	return {
		restrict: 'A',
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, required)
	.controller(controllerName, RequiredController);
