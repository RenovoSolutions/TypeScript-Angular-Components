/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/angularMocks.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />
/// <reference path='../../../libraries/typescript-angular-utilities/typings/utility.d.ts' />

/// <reference path="simpleCardList.module.ts" />
/// <reference path="simpleCard.ts" />

module rl.ui.components.simpleCard {
	import test = rl.utilities.services.test;
	import __parentChild = rl.utilities.services.parentChildBehavior;

	interface IListMock {
		openCard: Sinon.SinonSpy;
		registerCard: Sinon.SinonSpy;
	}

	interface IAutosaveBehaviorMock {
		autosave: Sinon.SinonSpy;
	}

	describe('SimpleCardController', () => {
		var scope: ng.IScope;
		var card: SimpleCardController;
		var list: IListMock;
		var parentChild: __parentChild.IParentChildBehaviorService;

		beforeEach(() => {
			angular.mock.module(simpleCardList.moduleName);

			list = {
				openCard: sinon.spy((): boolean => { return true; }),
				registerCard: sinon.spy(),
			};

			var services: any = test.angularFixture.inject(__parentChild.serviceName);
			parentChild = services[__parentChild.serviceName];
		});

		it('should register close behavior with the list', (): void => {
			buildController();

			sinon.assert.calledOnce(list.registerCard);

			var behavior: ISimpleCardBehavior = list.registerCard.firstCall.args[0];
			expect(_.isFunction(behavior.close)).to.be.true;
		});

		it('should register close behavior with the parent, if a child link is provided', (): void => {
			var childLink: any = {};
			buildController(false, childLink);

			var behavior: ISimpleCardBehavior = parentChild.getChildBehavior<ISimpleCardBehavior>(childLink);
			expect(_.isFunction(behavior.close)).to.be.true;
		});

		it('should not register behavior if no list is specified', (): void => {
			buildController(false);
			sinon.assert.notCalled(list.registerCard);
		});

		describe('toggleContent', (): void => {
			var behavior: IAutosaveBehaviorMock;

			beforeEach((): void => {
				buildController();
				card.autosaveLink = <any>{};
				behavior = {
					autosave: sinon.spy((): boolean => { return true; }),
				};

				parentChild.registerChildBehavior(card.autosaveLink, <any>behavior);
			});

			it('should autosave and close the card if the card is open', (): void => {
				card.showContent = true;

				card.toggleContent();

				expect(card.showContent).to.be.false;
			});

			it('should not close if the autosave returns false', (): void => {
				behavior.autosave = sinon.spy((): boolean => { return false; });
				card.showContent = true;

				card.toggleContent();

				expect(card.showContent).to.be.true;
			});

			it('should signal the list and then open if the card is closed', (): void => {
				expect(card.showContent).to.be.false;

				card.toggleContent();

				sinon.assert.calledOnce(list.openCard);
				sinon.assert.calledOnce(<Sinon.SinonSpy>card.onOpen);
				expect(card.showContent).to.be.true;
			});

			it('should not open the card if the list returns false', (): void => {
				list.openCard = sinon.spy((): boolean => { return false; });

				card.toggleContent();

				sinon.assert.calledOnce(list.openCard);
				sinon.assert.notCalled(<Sinon.SinonSpy>card.onOpen);
				expect(card.showContent).to.be.false;
			});

			it('should open the card without signaling the list if no list is present', (): void => {
				// rebuild the controller with no list
				buildController(false);

				card.toggleContent();

				sinon.assert.calledOnce(<Sinon.SinonSpy>card.onOpen);
				expect(card.showContent).to.be.true;
			});
		});

		function buildController(useList?: boolean, childLink?: any): void {
			var bindings: any = {
				onOpen: sinon.spy(),
				childLink: childLink,
			};

			var $element: any = {
				controller(): any {
					if (useList === false) {
						return null;
					} else {
						return list;
					}
				},
			};

			var controllerResult: test.IControllerResult<SimpleCardController>
				= test.angularFixture.controllerWithBindings<SimpleCardController>(controllerName, bindings, { $element: $element });

			scope = controllerResult.scope;
			card = controllerResult.controller;
		}
	});
}
