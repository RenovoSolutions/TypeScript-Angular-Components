/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { moduleName, simpleCard, simpleCardList } from './simpleCardList.module';

import * as angular from 'angular';
import 'angular-mocks';
import { Subject } from 'rxjs';

interface ICardBehaviorMock {
	close: Sinon.SinonSpy;
}

describe('SimpleCardListController', () => {
	let scope: angular.IScope;
	let list: simpleCardList.SimpleCardListController;
	let alwaysOpen: boolean;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should save a list of card behaviors', (): void => {
		buildController();

		const behavior: ICardBehaviorMock = {
			close: sinon.spy(),
		};
		list.registerCard(<any>behavior);

		expect(list.cards).to.have.length(1);
		expect(list.cards[0]).to.equal(behavior);
	});

	it('should trigger all cards to close on openCard and return the result', (): void => {
		buildController();
		const behavior: ICardBehaviorMock = {
			close: sinon.spy(() => true),
		};
		list.registerCard(<any>behavior);

		const canOpen: boolean = list.openCard();
		sinon.assert.calledOnce(behavior.close);
		expect(canOpen).to.be.true;
	});

	it('should expose changes to alwaysOpen as a stream', (): void => {
		buildController();
		const alwaysOpenSpy: Sinon.SinonSpy = sinon.spy();
		list.alwaysOpenChanges.subscribe(alwaysOpenSpy);

		list.alwaysOpenChange(true);

		expect(list.alwaysOpen).to.be.true;
		sinon.assert.calledOnce(alwaysOpenSpy);
		sinon.assert.calledWith(alwaysOpenSpy, true);
	});

	function buildController(): void {
		let $parse: any = (): Function => {
			return (): boolean => {
				return alwaysOpen;
			};
		};

		const $attrs: any = { $addClass: sinon.spy() };

		let controllerResult: test.IControllerResult<simpleCardList.SimpleCardListController>
			= test.angularFixture.controllerWithBindings<simpleCardList.SimpleCardListController>(simpleCardList.controllerName, null
				, { $parse: $parse, $attrs: $attrs });

		scope = controllerResult.scope;
		list = controllerResult.controller;
	}
});
