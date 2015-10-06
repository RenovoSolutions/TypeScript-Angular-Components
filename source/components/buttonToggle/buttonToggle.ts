'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

import __boolean = services.boolean;

export var moduleName: string = 'rl.ui.components.buttonToggle';

export var directiveName: string = 'rlButtonToggle';
export var controllerName: string = 'ButtonToggleController';

export interface IButtonToggleScope extends angular.IScope {
	ngModel: angular.INgModelController;
	type: string;
	size: string;
	onToggle(param: IToggleParam): void;
	disabled: boolean;
}

export interface IToggleParam {
	value: boolean;
}

export interface IButtonToggleController {
	isActive: boolean;
	buttonClass: string;
	buttonSize: string;

	clicked(): void;
}

class ButtonToggleController {
	isActive: boolean;
	buttonClass: string;
	buttonSize: string;

	static $inject: string[] = ['$scope', __boolean.serviceName];
	constructor(private $scope: IButtonToggleScope, bool: __boolean.IBooleanUtility) {
		this.buttonClass = $scope.type != null ? $scope.type : 'default';
		this.buttonSize = $scope.size != null ? 'btn-' + $scope.size : null;

		$scope.$watch('ngModel.$modelValue', (value: boolean): void => {
			this.isActive = bool.toBool(value);

			if (value != null && _.isFunction($scope.onToggle)) {
				$scope.onToggle({ value: value });
			}
		});
	}

	clicked(): void {
		this.$scope.ngModel.$setViewValue(!this.$scope.ngModel.$viewValue);
	}
}

function buttonToggle(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: '^ngModel',
		transclude: true,
		template: require('./buttonToggle.html'),
		controller: controllerName,
		controllerAs: 'buttonToggle',
		scope: {
			type: '@',
			size: '@',
			onToggle: '&',
			disabled: '=ngDisabled',
		},
		link(scope: IButtonToggleScope
			, element: angular.IAugmentedJQuery
			, attrs: angular.IAttributes
			, ngModel: angular.INgModelController): void {
			scope.ngModel = ngModel;
		}
	};
}

angular.module(moduleName, [__boolean.moduleName])
	.directive(directiveName, buttonToggle)
	.controller(controllerName, ButtonToggleController);
