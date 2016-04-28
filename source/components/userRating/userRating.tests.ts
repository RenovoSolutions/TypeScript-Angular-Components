/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { defaultThemeValueName } from '../componentsDefaultTheme';

import {
	moduleName,
	controllerName,
	IUserRatingBindings,
	UserRatingController,
} from './userRating';

import * as angular from 'angular';
import 'angular-mocks';

interface INgModelMock {
	$setViewValue(value: number): void;
	$viewValue: number;
}

describe('UserRatingController', () => {
	let scope: angular.IScope;
	let userRating: UserRatingController;

	let $timeout: angular.ITimeoutService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let mocks: any = {};
		mocks[defaultThemeValueName] = true;
		test.angularFixture.mock(mocks);

		let services: any = test.angularFixture.inject('$timeout');
		$timeout = services['$timeout'];

		buildController();
	});

	it('should create a list of stars with values 5 to 1', (): void => {
		expect(userRating.stars.length).to.equal(5);
		expect(userRating.stars[0].value).to.equal(5);
		expect(userRating.stars[1].value).to.equal(4);
		expect(userRating.stars[2].value).to.equal(3);
		expect(userRating.stars[3].value).to.equal(2);
		expect(userRating.stars[4].value).to.equal(1);
	});

	it('should set all stars less than or equal to the rating to filled', (): void => {
		userRating.setRating(3);

		expect(userRating.ngModel.$viewValue).to.equal(3);

		expect(userRating.stars[0].filled).to.be.false;
		expect(userRating.stars[1].filled).to.be.false;
		expect(userRating.stars[2].filled).to.be.true;
		expect(userRating.stars[3].filled).to.be.true;
		expect(userRating.stars[4].filled).to.be.true;
	});

	it('should set the initial view state based on the initial view value', (): void => {
		userRating.ngModel.$viewValue = 2;
		scope.$digest();

		$timeout.flush();

		expect(userRating.stars[0].filled).to.be.false;
		expect(userRating.stars[1].filled).to.be.false;
		expect(userRating.stars[2].filled).to.be.false;
		expect(userRating.stars[3].filled).to.be.true;
		expect(userRating.stars[4].filled).to.be.true;
	});

	function buildController(): void {
		let ngModel: INgModelMock = {
			$setViewValue: (value: number): void => { ngModel.$viewValue = value; },
			$viewValue: null,
		};
		let controllerResult: test.IControllerResult<UserRatingController>
			= test.angularFixture.controllerWithBindings<UserRatingController>(controllerName, { ngModel: ngModel });

		scope = controllerResult.scope;
		userRating = controllerResult.controller;
		userRating.$onInit();
	}
});
