import * as angular from 'angular';

import { defaultThemeValueName } from '../componentsDefaultTheme';

import { IRatingBarBackgroundsService, RatingBarBackgroundService } from './ratingBarBackgrounds.service';
import { IRatingBarClassService, RatingBarClassService } from './ratingBarClass.service';

import { IChangeObject } from '../../types/changes';

export var moduleName: string = 'rl.ui.components.ratingBar';
export var componentName: string = 'rlRatingBar';
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

export interface IRatingBarChanges {
	value?: IChangeObject<number>;
	totalWidth?: IChangeObject<number>;
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

	static $inject: string[] = [defaultThemeValueName];
	constructor(public useDefaultTheme: boolean) {
		let ratingBarBackgrounds: IRatingBarBackgroundsService = new RatingBarBackgroundService;
		this.ratingBarClass = new RatingBarClassService;

		this.backgroundClass = ratingBarBackgrounds.getBackground(this.background);

		if (this.value == null) {
			this.value = 0;
		}

		this.updateValue(this.value);
		this.updateDimensions(this.totalWidth);
	}

	$onChanges(changes: IRatingBarChanges): void {
		if (changes.value) {
			this.updateValue(changes.value.currentValue);
		}

		if (changes.totalWidth) {
			this.updateDimensions(changes.totalWidth.currentValue);
		}
	}

	private updateValue(newValue: number): void {
		var confidenceScore: number = (newValue - this.min) / (this.max - this.min);
		this.barClass = this.ratingBarClass.getClass(confidenceScore);
		this.width = Math.round(confidenceScore * this.totalWidth);
	}

	private updateDimensions(totalWidth: number): void {
		this.dimensions = {
			width: totalWidth + 2,
			height: this.height + 2,
		};
		this.updateValue(this.value);
	}
}

let ratingBar: angular.IComponentOptions = {
	template: `
		<div class="rating-bar">
			<div class="{{ratingBar.backgroundClass}}" ng-class="{ empty: ratingBar.value == ratingBar.min, 'default-theme': ratingBar.useDefaultTheme }" ng-style="ratingBar.dimensions">
				<div ng-class="ratingBar.barClass" ng-style="{ width: ratingBar.width, height: ratingBar.height }"></div>
			</div>
		</div>
	`,
	controller: controllerName,
	controllerAs: 'ratingBar',
	bindings: {
		totalWidth: '<width',
		height: '<',
		value: '<',
		min: '<',
		max: '<',
		background: '<',
	},
};

angular.module(moduleName, [])
	.component(componentName, ratingBar)
	.controller(controllerName, RatingBarController);
