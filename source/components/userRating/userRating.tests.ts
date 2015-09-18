/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path='userRating.ts' />

module rl.ui.components.userRating {
	'use strict';
	
	import test = utilities.services.test;
	
	interface INgModelMock {
		$setViewValue(value: number): void;
		$viewValue: number;
	}
	
	describe('UserRatingController', () => {
		var scope: IUserRatingScope;
		var userRating: IUserRatingController;
	
		beforeEach(() => {
			angular.mock.module(moduleName);
	
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
	
			expect(scope.ngModel.$viewValue).to.equal(3);
	
			expect(userRating.stars[0].filled).to.be.false;
			expect(userRating.stars[1].filled).to.be.false;
			expect(userRating.stars[2].filled).to.be.true;
			expect(userRating.stars[3].filled).to.be.true;
			expect(userRating.stars[4].filled).to.be.true;
		});
	
		it('should set the initial view state based on the initial view value', (): void => {
			scope.ngModel.$viewValue = 2;
			scope.$digest();
	
			expect(userRating.stars[0].filled).to.be.false;
			expect(userRating.stars[1].filled).to.be.false;
			expect(userRating.stars[2].filled).to.be.false;
			expect(userRating.stars[3].filled).to.be.true;
			expect(userRating.stars[4].filled).to.be.true;
		});
	
		function buildController(): void {
			var ngModel: INgModelMock = {
				$setViewValue: (value: number): void => { ngModel.$viewValue = value; },
				$viewValue: null,
			};
			var controllerResult: test.IControllerResult<IUserRatingController>
				= test.angularFixture.controllerWithBindings<IUserRatingController>(controllerName, null, null, { ngModel: ngModel });
	
			scope = <IUserRatingScope>controllerResult.scope;
			userRating = controllerResult.controller;
		}
	});
}
