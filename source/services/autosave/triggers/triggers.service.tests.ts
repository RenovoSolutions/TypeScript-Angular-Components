/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';
import test = services.test;

import { Trigger, ITrigger } from './trigger';
import { ITriggerService, serviceName, moduleName } from './triggers.service';

import * as ng from 'angular';
import 'angular-mocks';

describe('autosaveTriggers', () => {
	let triggerService: ITriggerService;

	beforeEach(() => {
		ng.mock.module(moduleName);

		let services: any = test.angularFixture.inject(serviceName);
		triggerService = services[serviceName];
	});

	it('should set the specified triggers', (): void => {
		sinon.spy(triggerService.triggers.onChange, 'setTrigger');
		sinon.spy(triggerService.triggers.none, 'setTrigger');

		triggerService.setTriggers('none', sinon.spy());

		sinon.assert.calledOnce(<Sinon.SinonSpy>triggerService.triggers.none.setTrigger);
		sinon.assert.notCalled(<Sinon.SinonSpy>triggerService.triggers.onChange.setTrigger);
	});

	it('should default to onChange', (): void => {
		sinon.spy(triggerService.triggers.onChange, 'setTrigger');
		sinon.spy(triggerService.triggers.none, 'setTrigger');

		triggerService.setTriggers(null, sinon.spy());

		sinon.assert.calledOnce(<Sinon.SinonSpy>triggerService.triggers.onChange.setTrigger);
		sinon.assert.notCalled(<Sinon.SinonSpy>triggerService.triggers.none.setTrigger);
	});
});
