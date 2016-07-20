import * as angular from 'angular';
import 'angular-mocks';

import { services } from 'typescript-angular-utilities';
import __test = services.test;
import mock = __test.mock;
import fakeAsync = __test.fakeAsync;
import IMockedPromise = __test.IMockedPromise;

import { ButtonAsyncController, moduleName, controllerName } from './buttonAsync.ng1';

describe('ButtonAsyncController', () => {
	let button: ButtonAsyncController;
	let actionSpy: any;

	beforeEach(() => {
		angular.mock.module(moduleName);
	});

	it('should be busy after triggering the action if no promise is returned', (): void => {
		actionSpy = sinon.spy(() => true);
		button = buildController();

		button.trigger();

		sinon.assert.calledOnce(actionSpy);
		expect(button.busy).to.be.true;
	});

	describe('should finish', (): void => {
		it('when promise resolves', fakeAsync((): void => {
			actionSpy = mock.promise();
			button = buildController();

			button.trigger();

			expect(button.busy).to.be.true;

			(<IMockedPromise<any>>actionSpy).flush();
			sinon.assert.calledOnce(actionSpy);
			expect(button.busy).to.be.false;
		}));

		it('when promise rejects', fakeAsync((): void => {
			const fakeError = 'fakeError';
			actionSpy = mock.rejectedPromise(fakeError);
			button = buildController();

			button.trigger().catch((error) => {
				expect(error).to.equal(fakeError);
			});

			expect(button.busy).to.be.true;

			(<IMockedPromise<any>>actionSpy).flush();

			sinon.assert.calledOnce(actionSpy);
			expect(button.busy).to.be.false;
		}));
	});

	it('should not allow triggers while busy', (): void => {
		actionSpy = sinon.spy(() => true);
		button = buildController(true);

		expect(button.busy).to.be.true;

		button.trigger();

		sinon.assert.notCalled(actionSpy);
	});

	function buildController(busy: boolean = false): ButtonAsyncController {
		var controllerResult: __test.IControllerResult<ButtonAsyncController>
			= __test.angularFixture.controllerWithBindings<ButtonAsyncController>(controllerName, { busy: busy, action: actionSpy });
		return controllerResult.controller;
	}
});
