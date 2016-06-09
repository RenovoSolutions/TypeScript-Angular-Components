import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import test = services.test;
import {IChild, IParentChildBehaviorService, serviceName as parentChildServiceName } from '../../services/parentChild/parentChild.service';

import {
	moduleName,
	simpleCard,
	simpleCardList,
} from './simpleCardList.module';

import * as angular from 'angular';
import 'angular-mocks';
import { Subject } from 'rxjs';

interface IListMock {
	openCard: Sinon.SinonSpy;
	registerCard: Sinon.SinonSpy;
	alwaysOpenChanges: Subject<boolean>;
}

interface IAutosaveBehaviorMock {
	autosave: Sinon.SinonSpy;
}

describe('SimpleCardController', () => {
	let scope: angular.IScope;
	let card: simpleCard.SimpleCardController;
	let list: IListMock;
	let parentChild: IParentChildBehaviorService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		list = {
			openCard: sinon.spy((): boolean => { return true; }),
			registerCard: sinon.spy(),
			alwaysOpenChanges: new Subject<boolean>(),
		};

		let services: any = test.angularFixture.inject(parentChildServiceName);
		parentChild = services[parentChildServiceName];
	});

	it('should register close behavior with the list', (): void => {
		buildController();

		sinon.assert.calledOnce(list.registerCard);

		let behavior: simpleCard.ISimpleCardBehavior = list.registerCard.firstCall.args[0];
		expect(_.isFunction(behavior.close)).to.be.true;
	});

	it('should register close behavior with the parent, if a child link is provided', (): void => {
		let childLink: any = {};
		buildController(false, childLink);

		let behavior: simpleCard.ISimpleCardBehavior = parentChild.getChildBehavior<simpleCard.ISimpleCardBehavior>(childLink);
		expect(_.isFunction(behavior.close)).to.be.true;
	});

	it('should not register behavior if no list is specified', (): void => {
		buildController(false);
		sinon.assert.notCalled(list.registerCard);
	});

	describe('toggleContent', (): void => {
		let behavior: IAutosaveBehaviorMock;

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

	describe('close', (): void => {
		it('should return true to indicate that another card can be opened without closing or autosaving if always open is true', (): void => {
			buildController();

			card.alwaysOpen = true;
			card.$onChanges({
				alwaysOpen: <any>{ currentValue: true },
			});

			expect(card.close()).to.be.true;
			expect(card.showContent).to.be.true;
		});
	});

	function buildController(useList?: boolean, childLink?: any): void {
		let bindings: any = {
			onOpen: sinon.spy(),
			childLink: childLink,
			listController: useList === false ? null : list,
		};

		let controllerResult: test.IControllerResult<simpleCard.SimpleCardController>
			= test.angularFixture.controllerWithBindings<simpleCard.SimpleCardController>(simpleCard.controllerName, bindings);

		scope = controllerResult.scope;
		card = controllerResult.controller;
		card.$onInit();
	}
});
