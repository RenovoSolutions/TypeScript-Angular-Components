/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../../typings/lodash/lodash.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import __parentChild = services.parentChildBehavior;

import {
	ICardScope,
	ICardBehavior,
	CardController,
	moduleName,
	controllerName,
} from './card';

import * as angular from 'angular';
import 'angular-mocks';

interface ICardContainerMock {
	openCard: Sinon.SinonSpy;
}

interface ICardChildBehaviorMock {
	initCard?: Sinon.SinonSpy;
	validateCard?: Sinon.SinonSpy;
	saveCard?: Sinon.SinonSpy;
	clickCard?: Sinon.SinonSpy;
}

interface IAutosaveBehaviorMock {
	autosave: Sinon.SinonSpy;
}

describe('CardController', () => {
	var scope: ICardScope;
	var card: CardController;
	var cardContainer: ICardContainerMock;
	var $q: angular.IQService;
	var parentChild: __parentChild.IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		cardContainer = {
			openCard: sinon.spy((): boolean => { return true; })
		};

		var services: any = test.angularFixture.inject('$q', __parentChild.serviceName);
		$q = services.$q;
		parentChild = services[__parentChild.serviceName];

		card = <any>{};
	});

	it('should set the selected property', (): void => {
		var selectSpy: Sinon.SinonSpy = sinon.spy();
		buildController();
		card.selectionChanged = selectSpy;

		expect(card.item.viewData.selected).to.not.be.true;

		card.setSelected(true);

		expect(card.item.viewData.selected).to.be.true;

		card.setSelected(false);

		expect(card.item.viewData.selected).to.be.false;

		sinon.assert.calledTwice(selectSpy);
	});

	describe('toggle', (): void => {
		it('should toggle the card content', (): void => {
			buildController();

			expect(card.showContent).to.be.false;

			card.toggleContent();

			expect(card.showContent).to.be.true;

			card.toggleContent();

			expect(card.showContent).to.be.false;
		});
	});

	describe('open', (): void => {
		it('should call the opening behavior if specified to give children a chance to perform initialization when the card opens', (): void => {
			buildController();

			var childBehavior: ICardChildBehaviorMock = {
				initCard: sinon.spy(),
			};

			parentChild.registerChildBehavior(card.item, childBehavior);

			card.toggleContent();

			sinon.assert.calledOnce(childBehavior.initCard);
		});
	});

	describe('close', (): void => {
		it('should register close behavior with the parentChild service', (): void => {
			buildController();

			var behavior: ICardBehavior = parentChild.getChildBehavior<ICardBehavior>(card.item);

			expect(behavior).to.exist;
			expect(_.isFunction(behavior.close)).to.be.true;
		});

		it('should close the card content if the close behavior is called', (): void => {
			buildController();

			card.showContent = true;

			parentChild.triggerChildBehavior(card.item, (behavior: ICardBehavior): void => {
				behavior.close();
			});

			expect(card.showContent).to.be.false;
		});

		it('should return true if the card isnt open', (): void => {
			buildController();

			var autosaveBehavior: IAutosaveBehaviorMock = {
				autosave: sinon.spy((): boolean => { return true; }),
			};
			parentChild.registerChildBehavior(card.autosaveLink, <any>autosaveBehavior);

			var closed: boolean = parentChild.triggerChildBehavior(card.item, (behavior: ICardBehavior): boolean => {
				return behavior.close();
			});

			expect(closed).to.be.true;
			sinon.assert.notCalled(autosaveBehavior.autosave);
		});

		it('should close the card if autosave returns true', (): void => {
			buildController();

			card.showContent = true;

			var autosaveBehavior: IAutosaveBehaviorMock = {
				autosave: sinon.spy((): boolean => { return true; }),
			};
			parentChild.registerChildBehavior(card.autosaveLink, <any>autosaveBehavior);

			var closed: boolean = parentChild.triggerChildBehavior(card.item, (behavior: ICardBehavior): boolean => {
				return behavior.close();
			});

			expect(card.showContent).to.be.false;
			expect(closed).to.be.true;
		});
	});

	describe('validateCard', (): void => {
		it('should return the result of validation if validation behavior exists', (): void => {
			buildController();

			var childBehavior: ICardChildBehaviorMock = {
				validateCard: sinon.spy((): boolean => { return true; }),
			};
			parentChild.registerChildBehavior(card.item, childBehavior);

			var validated: boolean = card.validateCard();

			expect(validated).to.be.true;

			sinon.assert.calledOnce(childBehavior.validateCard);
		});

		it('should return true if validation behavior isnt specified', (): void => {
			buildController();

			var validated: boolean = card.validateCard();

			expect(validated).to.be.true;
		});
	});

	describe('saveCard', (): void => {
		it('should return the save promise if save behavior exists', (): void => {
			buildController();

			var childBehavior: ICardChildBehaviorMock = {
				saveCard: sinon.spy((): angular.IPromise<void> => { return $q.when(); }),
			};
			parentChild.registerChildBehavior(card.item, childBehavior);

			var promise: angular.IPromise<void> = card.saveCard();

			// verify that a promise was returned
			expect(_.isFunction(promise.then)).to.be.true;

			sinon.assert.calledOnce(childBehavior.saveCard);
		});

		it('should return an empty promise if save behavior isnt specified', (): void => {
			buildController();

			var promise: angular.IPromise<void> = card.saveCard();

			// verify that a promise was returned
			expect(_.isFunction(promise.then)).to.be.true;
		});
	});

	describe('clickCard', (): void => {
		it('should trigger click card behavior', (): void => {
			buildController();

			var childBehavior: ICardChildBehaviorMock = {
				clickCard: sinon.spy(),
			};
			parentChild.registerChildBehavior(card.item, childBehavior);

			card.clickCard();

			sinon.assert.calledOnce(childBehavior.clickCard);
		});
	});

	function buildController(item?: any): void {
		if (item == null) {
			item = {
				viewData: {},
			};
		}
		card.item = item;

		var controllerResult: test.IControllerResult<CardController>
			= test.angularFixture.controllerWithBindings<CardController>(controllerName, card);

		scope = <ICardScope>controllerResult.scope;
		scope.rlCardContainer = <any>cardContainer;
		card = controllerResult.controller;

		var autosaveBehavior: IAutosaveBehaviorMock = {
			autosave: sinon.spy((): boolean => { return true; }),
		};
		parentChild.registerChildBehavior(card.autosaveLink, <any>autosaveBehavior);
	}
});
