import * as angular from 'angular';

import * as SignaturePad from 'signature_pad';

export var moduleName: string = 'rl.ui.components.signaturePad';
export var directiveName: string = 'rlSignaturePad';

export interface ISignaturePadScope extends angular.IScope {
	pad: SignaturePad;
	height: number;
	width: number;
	ngDisabled: boolean;

	style: any;
	ngModel: angular.INgModelController;
}

export function signaturePad(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		require: 'ngModel',
		template: `
			<canvas class="signature-pad" ng-if="!ngDisabled"></canvas>
			<img ng-src="{{ngModel.$viewValue}}" ng-style="style" ng-if="ngDisabled" />
		`,
		scope: {
			pad: '=?',
			height: '=',
			width: '=',
			ngDisabled: '=',
		},
		link(scope: ISignaturePadScope
			, element: angular.IAugmentedJQuery
			, attrs: any
			, ngModel: angular.INgModelController): void {
			scope.$watch('ngDisabled', (disabled: boolean): void => {
				scope.ngModel = ngModel;
				if (disabled) {
					scope.style = {
						height: scope.height != null ? scope.height : 100,
						width: scope.width != null ? scope.width : 200,
					};
				} else {
					var canvas: HTMLCanvasElement = <HTMLCanvasElement>element.find('.signature-pad').get(0);
					var options: any = {
						backgroundColor: 'rgb(255, 255, 255)',
					};

					scope.pad = new SignaturePad(canvas, options);

					canvas.height = scope.height != null ? scope.height : 100;
					canvas.width = scope.width != null ? scope.width : 200;

					scope.$watch((): string => { return ngModel.$viewValue; }, (value: string): void => {
						if (value != null) {
							scope.pad.fromDataURL(value);
						}
					});

					scope.$watch((): string => { return scope.pad.toDataURL(); }, (value: string): void => {
						if (value != null) {
							ngModel.$setViewValue(value);
						}
					});
				}
			});
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, signaturePad);
