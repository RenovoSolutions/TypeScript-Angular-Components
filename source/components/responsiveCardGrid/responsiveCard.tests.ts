/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path="responsiveCardGrid.module.ts" />
/// <reference path="responsiveCard.ts" />
/// <reference path="responsiveCardGrid.mock.tests.ts" />

module rl.ui.components.responsiveCard {
	import test = rl.utilities.services.test;
	import __parentChild = rl.utilities.services.parentChildBehavior;

	interface IAutosaveBehaviorMock {
		autosave: Sinon.SinonSpy;
	}

	describe('ResponsiveCardController', () => {
		var scope: ng.IScope;
		var card: IResponsiveCardController;
		var parentChildBehavior: __parentChild.IParentChildBehaviorService;
		var cardGridMock: responsiveCardGrid.ICardGridMock;

		beforeEach(() => {
			angular.mock.module(responsiveCardGrid.moduleName);

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
			cardGridMock = new responsiveCardGrid.CardGridMock();

			var bindings: any = {
				header: {},
			};

			var $element: any = {
				controller(): any {
					return cardGridMock;
				},
			};

			var controllerResult: test.IControllerResult<IResponsiveCardController>
				= test.angularFixture.controllerWithBindings<IResponsiveCardController>(controllerName, bindings, { $element: $element });

			scope = controllerResult.scope;
			card = controllerResult.controller;
			// digest to register card behavior with the card grid
			scope.$digest();
		}
	});
}