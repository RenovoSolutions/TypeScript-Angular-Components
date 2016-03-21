'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { INgModelValidator } from '../../types/formValidators';

export let moduleName: string = 'rl.ui.behaviors.required';
export let directiveName: string = 'rlRequired';
export let controllerName: string = 'RequiredController';

export interface IRequiredAttributes extends angular.IAttributes {
	rlRequired: string;
}

export class RequiredController {
	static $inject: string[] = ['$scope', '$attrs', '$interpolate'];
	constructor(private $scope: angular.IScope
			, private $attrs: IRequiredAttributes
			, private $interpolate: angular.IInterpolateService) {}

	message: string;

	$onInit(): void {
		this.message = this.$interpolate(this.$attrs.rlRequired)(this.$scope);
	}
}

function required(): angular.IDirective {
	return {
		restrict: 'A',
		priority: 200,
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, required)
	.controller(controllerName, RequiredController);
