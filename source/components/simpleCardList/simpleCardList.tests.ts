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

interface IObservableMock {
	register: Sinon.SinonSpy;
	fire: Sinon.SinonSpy;
}

interface ICardBehaviorMock {
	close: Sinon.SinonSpy;
	setAlwaysOpen: Sinon.SinonSpy;
}

describe('SimpleCardListController', () => {
	let scope: angular.IScope;
	let list: simpleCardList.ISimpleCardListController;
	let observable: IObservableMock;
	let alwaysOpen: boolean;

	beforeEach(() => {
		angular.mock.module(moduleName);

		observable = {
			register: sinon.spy(),
			fire: sinon.spy((): boolean => { return true; }),
		};

		let observableFactory: any = {
			getInstance(): IObservableMock {
				return observable;
			},
		};

		test.angularFixture.mock({
			observableFactory: observableFactory,
		});
	});

	it('should register close behavior with the observable', (): void => {
		buildController();

		let behavior: ICardBehaviorMock = {
			close: sinon.spy(),
			setAlwaysOpen: sinon.spy(),
		};
		list.registerCard(<any>behavior);

		sinon.assert.calledTwice(observable.register);
		sinon.assert.calledWith(observable.register, behavior.close, 'close');
		sinon.assert.calledWith(observable.register, behavior.setAlwaysOpen, 'alwaysOpen');
	});

	it('should trigger all cards to close on openCard and return the result', (): void => {
		buildController();
		let canOpen: boolean = list.openCard();
		sinon.assert.calledOnce(observable.fire);
		sinon.assert.calledWith(observable.fire, 'close');
		expect(canOpen).to.be.true;
	});

	it('should trigger all cards to toggle alwaysOpen when the flag changes on the list', (): void => {
		buildController();
		alwaysOpen = true;
		scope.$digest();
		sinon.assert.calledOnce(observable.fire);
		sinon.assert.calledWith(observable.fire, 'alwaysOpen', true);
	});

	function buildController(): void {
		let $parse: any = (): Function => {
			return (): boolean => {
				return alwaysOpen;
			};
		};

		const $attrs: any = { $addClass: sinon.spy() };

		let controllerResult: test.IControllerResult<simpleCardList.ISimpleCardListController>
			= test.angularFixture.controllerWithBindings<simpleCardList.ISimpleCardListController>(simpleCardList.controllerName, null
				, { $parse: $parse, $attrs: $attrs });

		scope = controllerResult.scope;
		list = controllerResult.controller;
	}
});
