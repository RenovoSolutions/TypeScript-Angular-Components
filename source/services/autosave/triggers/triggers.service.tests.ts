import { services } from 'typescript-angular-utilities';
import test = services.test;

import { Trigger, ITrigger } from './trigger';
import { ITriggerService, factoryName, moduleName } from './triggers.service';

import * as ng from 'angular';
import 'angular-mocks';

describe('autosaveTriggers', () => {
	let triggerService: ITriggerService;

	beforeEach(() => {
		ng.mock.module(moduleName);

		let services: any = test.angularFixture.inject(factoryName);
		triggerService = services[factoryName].getInstance();
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
