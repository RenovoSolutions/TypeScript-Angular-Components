'use strict';

import * as angular from 'angular';

import * as SignaturePad from 'signature_pad';

export var moduleName: string = 'rl.ui.components.signaturePad';
export var directiveName: string = 'rlSignaturePad';

export interface ISignaturePadScope extends angular.IScope {
	signature: string;
	pad: SignaturePad;
	height: number;
	width: number;
	ngDisabled: boolean;

	style: any;
}

export function signaturePad(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<canvas class="signature-pad" ng-if="!ngDisabled"></canvas>
			<img ng-src="{{signature}}" ng-style="style" ng-if="ngDisabled" />
		`,
		scope: {
			signature: '=',
			pad: '=',
			height: '=',
			width: '=',
			ngDisabled: '=',
		},
		link(scope: ISignaturePadScope, element: angular.IAugmentedJQuery): void {
			scope.$watch('ngDisabled', (disabled: boolean): void => {
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

					scope.$watch('signature', (value: string): void => {
						if (value != null) {
							scope.pad.fromDataURL(value);
						}
					});
				}
			});
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, signaturePad);
