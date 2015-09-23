// /// <reference path='../../../typings/angularjs/angular.d.ts' />
// /// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

module rl.ui.components.stringWithWatermark {
	'use strict';

	export var moduleName: string = 'rl.ui.components.stringWithWatermark';
	export var directiveName: string = 'rlStringWithWatermark';
	export var controllerName: string = 'StringWithWatermarkController';

	import __object = rl.utilities.services.object;

	export interface IStringWithWatermarkBindings {
		string: string;
		watermark: string;
	}

	export class StringWithWatermarkController implements IStringWithWatermarkBindings {
		// bindings
		string: string;
		watermark: string;

		hasString: boolean;

		static $inject: string[] = ['$scope', __object.serviceName];
		constructor($scope: ng.IScope, objectUtility: __object.IObjectUtility) {
			$scope.$watch((): string => { return this.string; }, (value: string): void => {
				this.hasString = objectUtility.isNullOrEmpty(value) === false;
			});
		}
	}

	export function stringWithWatermark(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			template: `
				<span>
					<span ng-show="controller.hasString">{{controller.string}}</span>
					<span ng-hide="controller.hasString" class="watermark">{{controller.watermark}}</span>
				</span>
			`,
			controller: controllerName,
			controllerAs: 'controller',
			scope: {},
			bindToController: {
				string: '@',
				watermark: '@',
			}
		};
	}

	angular.module(moduleName, [__object.moduleName])
		.directive(directiveName, stringWithWatermark)
		.controller(controllerName, StringWithWatermarkController);
}
