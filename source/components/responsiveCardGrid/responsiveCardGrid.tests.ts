/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import { moduleName, responsiveCardGrid } from './responsiveCardGrid.module';

import { xs, sm, md, lg } from '../../services/breakpoints/breakpoint';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IBreakpointServiceMock {
	currentBreakpoint: string;
	breakpointChangeAction: any;
	register: Sinon.SinonSpy;
	triggerChange(): void;
}

interface ICardBehaviorMock {
	autosave: Sinon.SinonSpy;
	close: Sinon.SinonSpy;
	open: Sinon.SinonSpy;
	hoverIn: Sinon.SinonSpy;
	hoverOut: Sinon.SinonSpy;
	updateEndOfRowStatus: Sinon.SinonSpy;
}

describe('ResponsiveCardGridController', () => {
	var scope: angular.IScope;
	var cardGrid: responsiveCardGrid.ResponsiveCardGridController;
	var breakpoints: IBreakpointServiceMock;
	var firstRowCard: ICardBehaviorMock;
	var secondRowCard1: ICardBehaviorMock;
	var secondRowCard2: ICardBehaviorMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		breakpoints = {
			currentBreakpoint: md,
			breakpointChangeAction: null,
			register: sinon.spy((action: any): void => {
				breakpoints.breakpointChangeAction = action;
			}),
			triggerChange: (): void => { breakpoints.breakpointChangeAction(); },
		};

		test.angularFixture.mock({
			breakpoints: breakpoints,
		});

		firstRowCard = newCard();
		secondRowCard1 = newCard();
		secondRowCard2 = newCard();

		buildController(1);

		cardGrid.registerCard(firstRowCard, null);
		cardGrid.registerCard(secondRowCard1, null);
		cardGrid.registerCard(secondRowCard2, null);
	});

	it('should call hoverIn on all cards in the same row', (): void => {
		cardGrid.hoverIn(<any>secondRowCard1);

		sinon.assert.calledOnce(secondRowCard1.hoverIn);
		sinon.assert.calledOnce(secondRowCard2.hoverIn);
		sinon.assert.notCalled(firstRowCard.hoverIn);
	});

	it('should call hoverOut on all cards', (): void => {
		cardGrid.hoverOut();

		sinon.assert.calledOnce(firstRowCard.hoverOut);
		sinon.assert.calledOnce(secondRowCard1.hoverOut);
		sinon.assert.calledOnce(secondRowCard2.hoverOut);
	});

	it('should return true if the card index + 1 is divisible by the current row size', (): void => {
		var endOfRowCard: any = { index: 1 };
		var inRowCard: any = { index: 0 };

		expect(cardGrid.cardIsEndOfRow(endOfRowCard)).to.be.true;
		expect(cardGrid.cardIsEndOfRow(inRowCard)).to.be.false;
	});

	it('should call updateEndOfRowStatus on all cards on a breakpoint change', (): void => {
		sinon.assert.calledOnce(breakpoints.register);

		breakpoints.triggerChange();

		sinon.assert.calledOnce(firstRowCard.updateEndOfRowStatus);
		sinon.assert.calledOnce(secondRowCard1.updateEndOfRowStatus);
		sinon.assert.calledOnce(secondRowCard2.updateEndOfRowStatus);
	});

	describe('openCard', (): void => {
		it('should call autosave behavior on all cards', (): void => {
			cardGrid.openCard(<any>secondRowCard1);

			sinon.assert.calledOnce(firstRowCard.autosave);
			sinon.assert.calledOnce(secondRowCard1.autosave);
			sinon.assert.calledOnce(secondRowCard2.autosave);
		});

		it('should call close behavior on all cards if cards autosave successfully', (): void => {
			cardGrid.openCard(<any>secondRowCard1);

			sinon.assert.calledOnce(firstRowCard.close);
			sinon.assert.calledOnce(secondRowCard1.close);
			sinon.assert.calledOnce(secondRowCard2.close);
		});

		it('should call open behavior on all cards in the same row if all cards autosave successfully', (): void => {
			cardGrid.openCard(<any>secondRowCard1);

			sinon.assert.calledOnce(secondRowCard1.open);
			sinon.assert.calledOnce(secondRowCard2.open);
			sinon.assert.notCalled(firstRowCard.open);
		});

		it('should not call open behavior if at least one card fails to save', (): void => {
			firstRowCard.autosave = sinon.spy((): boolean => { return false; });

			// rebuild and register cards to update the autosave behavior for the first card
			buildController(1);

			cardGrid.registerCard(firstRowCard, null);
			cardGrid.registerCard(secondRowCard1, null);
			cardGrid.registerCard(secondRowCard2, null);

			cardGrid.openCard(<any>secondRowCard1);

			sinon.assert.notCalled(firstRowCard.open);
			sinon.assert.notCalled(secondRowCard1.open);
			sinon.assert.notCalled(secondRowCard2.open);
		});
	});

	function buildController(startingIndex: number): void {
		var nextIndex: number = 0;
		var findPosition: any = (): number => {
			return nextIndex++;
		};

		var bindings: any = {
			startingIndex: startingIndex,
			findPosition: findPosition,
		};

		var controllerResult: test.IControllerResult<responsiveCardGrid.ResponsiveCardGridController>
			= test.angularFixture.controllerWithBindings<responsiveCardGrid.ResponsiveCardGridController>(responsiveCardGrid.controllerName, bindings);

		scope = controllerResult.scope;
		cardGrid = controllerResult.controller;
	}

	function newCard(): ICardBehaviorMock {
		return {
			autosave: sinon.spy((): boolean => { return true; }),
			close: sinon.spy(),
			open: sinon.spy(),
			hoverIn: sinon.spy(),
			hoverOut: sinon.spy(),
			updateEndOfRowStatus: sinon.spy(),
		};
	}
});
