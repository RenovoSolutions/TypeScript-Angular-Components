/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { OnSubmitTrigger, OnSubmitSettings } from './onSubmitTrigger';
import { ITrigger } from './trigger';
import { moduleName } from './triggers.service';

import * as ng from 'angular';
import 'angular-mocks';

interface IAutosaveActionMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

describe('onSubmitTrigger', () => {
	let trigger: ITrigger<OnSubmitSettings>;
	let saveSpy: Sinon.SinonSpy;
	let triggerSpy: Sinon.SinonSpy;

	beforeEach(() => {
		ng.mock.module(moduleName);

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		let autosaveActionService: IAutosaveActionMock = { trigger: triggerSpy };

		let services: any = test.angularFixture.inject('$q');
		let $q: ng.IQService = services.$q;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });

		trigger = new OnSubmitTrigger();
	});

	it('should trigger autosave when the form is submitted', (): void => {
		let submit: { (): void };
		let submitListener: any = (callback: { (): void }): Sinon.SinonSpy => {
			submit = callback;
			return sinon.spy();
		};

		trigger.configure({
			setSubmitListener: submitListener,
		});
		trigger.setTrigger(saveSpy);

		submit();

		sinon.assert.calledOnce(saveSpy);
	});
});
