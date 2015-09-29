/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	RatingBarController,
} from './ratingBar';

import { IRatingBarBackgroundsService, RatingBarBackgroundService } from './ratingBarBackgrounds.service';

import { IRatingBarClassService, RatingBarClassService } from './ratingBarClass.service';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IRatingBarProperties {
	value: number;
	min: number;
	max: number;
	background: number;
	height: number;
	totalWidth: number;
}

describe('RatingBarController', () => {
	var scope: angular.IScope;
	var ratingBar: RatingBarController;
	var ratingBarBackgrounds: IRatingBarBackgroundsService;
	var ratingBarClass: IRatingBarClassService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		ratingBarBackgrounds = new RatingBarBackgroundService();
		ratingBarClass = new RatingBarClassService();
	});

	describe('background', (): void => {
		it('should set the background to dark', (): void => {
			buildController(<any>{ background: ratingBarBackgrounds.dark.type });
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.dark.class);
		});

		it('should set the background to transparent', (): void => {
			buildController(<any>{ background: ratingBarBackgrounds.transparent.type });
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.transparent.class);
		});

		it('should use the default background', (): void => {
			buildController();
			expect(ratingBar.backgroundClass).to.equal(ratingBarBackgrounds.standard.class);
		});
	});

	describe('dimensions', (): void => {
		it('should set the dimensions to tne number passed in plus 2 pixels on each size', (): void => {
			buildController(<any>{ height: 20, totalWidth: 30 });
			scope.$digest();

			expect(ratingBar.dimensions.height).to.equal(22);
			expect(ratingBar.dimensions.width).to.equal(32);

			// only the width can be updated dynamically from outside the directive
			ratingBar.totalWidth = 40;
			scope.$digest();

			expect(ratingBar.dimensions.width).to.equal(42);
		});
	});

	describe('confidence', (): void => {
		it('should set the value on the controller', (): void => {
			buildController(<any>{ value: 20 });
			expect(ratingBar.value).to.equal(20);
		});

		it('should default to 0 if no value is provided', (): void => {
			buildController();
			expect(ratingBar.value).to.equal(0);
		});

		it('should set the width to the confidence score multiplied by the total width', (): void => {
			var confidenceData: IRatingBarProperties = <any>{
				value: 20,
				min: 0,
				max: 40,
				totalWidth: 20,
			};

			buildController(confidenceData);
			scope.$digest();

			// confidence = 20 / 40 = 0.5;
			// width = 0.5 * 20 = 10;
			expect(ratingBar.width).to.equal(10);
		});

		describe('class', (): void => {
			var confidenceData: IRatingBarProperties;

			beforeEach((): void => {
				confidenceData = <any>{
					min: 0,
					max: 100,
				};
			});

			it('should set the class to very high if the confidence is equal to or above 80%', (): void => {
				confidenceData.value = 80;

				buildController(confidenceData);
				scope.$digest();

				expect(ratingBar.barClass).to.equal('very-high');
			});

			it('should set the class to high if the confidence is between 60% and 80%', (): void => {
				confidenceData.value = 60;

				buildController(confidenceData);
				scope.$digest();

				expect(ratingBar.barClass).to.equal('high');
			});

			it('should set the class to high if the confidence is between 40% and 60%', (): void => {
				confidenceData.value = 40;

				buildController(confidenceData);
				scope.$digest();

				expect(ratingBar.barClass).to.equal('medium');
			});

			it('should set the class to high if the confidence is between 20% and 40%', (): void => {
				confidenceData.value = 20;

				buildController(confidenceData);
				scope.$digest();

				expect(ratingBar.barClass).to.equal('low');
			});

			it('should set the class to very high if the confidence is equal to or below 20%', (): void => {
				confidenceData.value = 0;

				buildController(confidenceData);
				scope.$digest();

				expect(ratingBar.barClass).to.equal('very-low');
			});
		});
	});

	function buildController(initialProperties?: IRatingBarProperties): void {
		var controllerResult: test.IControllerResult<RatingBarController>
			= test.angularFixture.controllerWithBindings<RatingBarController>(controllerName, initialProperties);

		scope = controllerResult.scope;
		ratingBar = controllerResult.controller;
	}
});
