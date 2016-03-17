'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { INgModelValidator } from '../../types/ngModelValidator';

export let moduleName: string = 'rl.ui.behaviors.required';
export let directiveName: string = 'rlRequired';
export let controllerName: string = 'RequiredController';

export interface IRequiredAttributes extends angular.IAttributes {
	rlRequired: string;
	required: string;
}

export class RequiredController {
	static $inject: string[] = ['$scope', '$attrs', '$element', '$interpolate', '$compile'];
	constructor(private $scope: angular.IScope
			, private $attrs: IRequiredAttributes
			, private $element: angular.IAugmentedJQuery
			, private $interpolate: angular.IInterpolateService
			, private $compile: angular.ICompileService) {}

	ngModel: INgModelValidator;

	$onInit(): void {
		this.ngModel = this.$element.controller('ngModel');
		this.ngModel.rlErrorMessage = this.$interpolate(this.$attrs.rlRequired)(this.$scope);

		if (__object.objectUtility.isNullOrEmpty(this.$attrs.required)) {
			this.$attrs.$set('required', true);
			this.$compile(this.$element)(this.$scope);
		}
	}
}

function required(): angular.IDirective {
	return {
		require: 'ngModel',
		restrict: 'A',
		priority: 200,
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, required)
	.controller(controllerName, RequiredController);
