/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	responsiveCard,
} from './responsiveCardGrid.module';

import { ICardGridMock, CardGridMock } from './responsiveCardGrid.mock.tests';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;
import __parentChild = services.parentChildBehavior;

interface IAutosaveBehaviorMock {
	autosave: Sinon.SinonSpy;
}

describe('ResponsiveCardController', () => {
	var scope: angular.IScope;
	var card: responsiveCard.IResponsiveCardController;
	var parentChildBehavior: __parentChild.IParentChildBehaviorService;
	var cardGridMock: ICardGridMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		var services: any = test.angularFixture.inject(__parentChild.serviceName);
		parentChildBehavior = services[__parentChild.serviceName];

		buildController();
	});

	it('should trigger the card grid to hoverIn and set isHovering to true', (): void => {
		card.triggerHoverIn();

		sinon.assert.calledOnce(cardGridMock.hoverInSpy);
		expect(card.isHovering).to.be.true;
	});

	it('should trigger the card grid to hoverOut and set isHovering to false', (): void => {
		card.isHovering = true;

		card.triggerHoverOut();

		sinon.assert.calledOnce(cardGridMock.hoverOutSpy);
		expect(card.isHovering).to.be.false;
	});

	it('should unregister from the grid on $destroy', (): void => {
		scope.$destroy();
		sinon.assert.calledOnce(cardGridMock.unregisterSpy);
	});

	describe('openCloseBehavior', (): void => {
		var behavior: IAutosaveBehaviorMock;
		var otherCard: any;

		beforeEach((): void => {
			card.autosaveLink = <any>{};
			behavior = {
				autosave: sinon.spy((): boolean => { return true; }),
			};

			otherCard = {};

			parentChildBehavior.registerChildBehavior(card.autosaveLink, <any>behavior);
		});

		it('should open the card if all other cards close successfully on toggle', (): void => {
			card.toggle();
			sinon.assert.calledOnce(cardGridMock.openCardSpy);
			expect(card.showDetails).to.be.true;
		});

		it('should close the card if the card is currently open', (): void => {
			card.showDetails = true;
			card.toggle();
			sinon.assert.calledOnce(cardGridMock.closeCardSpy);
			expect(card.showDetails).to.be.false;
		});

		it('should trigger an autosave if the card is open', (): void => {
			card.showDetails = true;
			card.cardGridController.openCard(otherCard);

			sinon.assert.calledOnce(behavior.autosave);
		});

		it('should close if the autosave returns true', (): void => {
			card.showDetails = true;
			card.cardGridController.openCard(otherCard);

			expect(card.showDetails).to.be.false;
		});

		it('should not close if the autosave returns false', (): void => {
			behavior.autosave = sinon.spy((): boolean => { return false; });
			card.showDetails = true;
			card.cardGridController.openCard(otherCard);

			expect(card.showDetails).to.be.true;
		});
	});

	function buildController(): void {
		cardGridMock = new CardGridMock();

		var bindings: any = {
			header: {},
		};

		var $element: any = {
			controller(): any {
				return cardGridMock;
			},
		};

		var controllerResult: test.IControllerResult<responsiveCard.IResponsiveCardController>
			= test.angularFixture.controllerWithBindings<responsiveCard.IResponsiveCardController>(responsiveCard.controllerName, bindings, { $element: $element });

		scope = controllerResult.scope;
		card = controllerResult.controller;
		// digest to register card behavior with the card grid
		scope.$digest();
	}
});
