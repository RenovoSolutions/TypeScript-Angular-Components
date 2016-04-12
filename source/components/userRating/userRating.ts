'use strict';

import './userRating.css';

import * as angular from 'angular';
import * as _ from 'lodash';

import { defaultThemeValueName } from '../componentsDefaultTheme';

export let moduleName: string = 'rl.components.userRating';

export let componentName: string = 'rlUserRating';
export let controllerName: string = 'UserRatingController';

export interface IStar {
	value: number;
	filled: boolean;
}

export interface IUserRatingBindings {
	range: number;
}

export interface IUserRatingController extends IUserRatingBindings {
	stars: IStar[];
	setRating(rating: number): void;
}

export class UserRatingController implements IUserRatingController {
	range: number;

	stars: IStar[];
	ngModel: angular.INgModelController;

	static $inject: string[] = ['$timeout', defaultThemeValueName];
	constructor(private $timeout: angular.ITimeoutService, public useDefaultTheme: boolean) { }

	$onInit(): void {
		this.stars = [];
		let rangeSize: number = this.range != null ? this.range : 5;
		// css style requires the stars to show right to left. Reverse the list so the highest value is first
		let range: number[] = _.range(1, rangeSize + 1).reverse();
		_.each(range, (rating: number): void => {
			this.stars.push({
				value: rating,
				filled: false,
			});
		});

		this.$timeout((): void => {
			this.updateStarView(this.ngModel.$viewValue);
		});
	}

	setRating(rating: number): void {
		this.ngModel.$setViewValue(rating);
		this.updateStarView(rating);
	}

	private updateStarView(rating: number): void {
		_.each(this.stars, (star: IStar): void => {
			if (star.value <= rating) {
				star.filled = true;
			} else {
				star.filled = false;
			}
		});
	}
}

let userRating: angular.IComponentOptions = {
	require: { ngModel: 'ngModel' },
	template: `
		<span class="rating" ng-class="{ 'default-theme': userRating.useDefaultTheme }">
			<span class="star" ng-repeat="star in userRating.stars" ng-class="{ 'filled': star.filled }" ng-click="userRating.setRating(star.value)"></span>
		</span>
	`,
	controller: controllerName,
	controllerAs: 'userRating',
	bindings: {
		range: '=',
	},
};

angular.module(moduleName, [])
	.component(componentName, userRating)
	.controller(controllerName, UserRatingController);
