// /// <reference path='../../../typings/angularjs/angular.d.ts' />

/// <reference path='ratingBarBackgrounds.service.ts' />
/// <reference path='ratingBarClass.service.ts' />

module rl.ui.components.ratingBar {
	'use strict';

	export var moduleName: string = 'rl.ui.components.ratingBar';
	export var directiveName: string = 'rlRatingBar';
	export var controllerName: string = 'RatingBarController';

	export interface IDimensions {
		width: number;
		height: number;
	}

	export interface IRatingBarScopeBindings {
		totalWidth: number;
		height: number;
		value: number;
		min: number;
		max: number;
		background: string;
	}

	export class RatingBarController implements IRatingBarScopeBindings {
		// bindings
		totalWidth: number;
		height: number;
		value: number;
		min: number;
		max: number;
		background: string;

		backgroundClass: string;
		dimensions: IDimensions;
		width: number;
		barClass: string;

		private ratingBarClass: IRatingBarClassService;

		static $inject: string[] = ['$scope'];
		constructor(private $scope: ng.IScope) {
			let ratingBarBackgrounds: IRatingBarBackgroundsService = new RatingBarBackgroundService;
			this.ratingBarClass = new RatingBarClassService;

			this.backgroundClass = ratingBarBackgrounds.getBackground(this.background);

			if (this.value == null) {
				this.value = 0;
			}

			$scope.$watch((): number => { return this.value; }, (newValue: number): void => {
				this.updateValue(newValue);
			});

			$scope.$watch((): number => { return this.totalWidth; }, (newWidth: number): void => {
				this.dimensions = {
					width: newWidth + 2,
					height: this.height + 2,
				};
				this.updateValue(this.value);
			});
		}

		private updateValue(newValue: number): void {
			var confidenceScore: number = (newValue - this.min) / (this.max - this.min);
			this.barClass = this.ratingBarClass.getClass(confidenceScore);
			this.width = Math.round(confidenceScore * this.totalWidth);
		}
	}

	export function ratingBar(): ng.IDirective {
		'use strict';
		return {
			restrict: 'E',
			templateUrl: 'components/ratingBar/ratingBar.html',
			controller: controllerName,
			controllerAs: 'ratingBar',
			scope: {},
			bindToController: {
				totalWidth: '=width',
				height: '=',
				value: '=',
				min: '=',
				max: '=',
				background: '=',
			},
		};
	}

	angular.module(moduleName, [])
		.directive(directiveName, ratingBar)
		.controller(controllerName, RatingBarController);
}
