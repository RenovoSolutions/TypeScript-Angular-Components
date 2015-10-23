'use strict';

import * as angular from 'angular';

import * as SignaturePad from 'signature_pad';

export var moduleName: string = 'rl.ui.components.signaturePad';
export var directiveName: string = 'rlSignaturePad';

export interface ISignaturePadScope extends angular.IScope {
	signature: SignaturePad;
	initial: string;
	height: number;
	width: number;
}

export function signaturePad(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: `
			<canvas class="signature-pad"></canvas>
		`,
		scope: {
			signature: '=',
			initial: '=',
			height: '=',
			width: '=',
		},
		link(scope: ISignaturePadScope, element: angular.IAugmentedJQuery): void {
			var canvas: HTMLCanvasElement = <HTMLCanvasElement>element.find('.signature-pad').get(0);
			var options: any = {
				backgroundColor: 'rgb(255, 255, 255)',
			};

			scope.signature = new SignaturePad(canvas, options);

			canvas.height = scope.height != null ? scope.height : 100;
			canvas.width = scope.width != null ? scope.width : 200;

			if (scope.initial != null) {
				scope.signature.fromDataURL(scope.initial);
			}
		},
	};
}

angular.module(moduleName, [])
	.directive(directiveName, signaturePad);
