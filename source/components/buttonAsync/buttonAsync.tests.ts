import { services } from 'typescript-angular-utilities';

import {
	ButtonAsyncController,
	moduleName,
	controllerName,
} from './buttonAsync';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

describe('ButtonAsyncController', () => {
	var scope: angular.IScope;
	var button: ButtonAsyncController;
	var actionSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		actionSpy = sinon.spy(() => true);
	});

	it('should be busy after triggering the action if no promise is returned', (): void => {
		button = buildController();
		scope.$digest();

		button.trigger();
		scope.$digest();

		expect(button.busy).to.be.true;
		sinon.assert.calledOnce(actionSpy);
	});

	describe('should finish after promise ends', (): void => {
		var deferred: angular.IDeferred<any>;

		beforeEach((): void => {
			var $q: angular.IQService = test.angularFixture.inject('$q').$q;
			deferred = $q.defer();

			actionSpy = sinon.spy((): angular.IPromise<any> => {
				return deferred.promise;
			});

			button = buildController();
			button.trigger();

			expect(button.busy).to.be.true;
		});

		it('should finish after promise completes', (): void => {
			deferred.resolve();
			scope.$digest();

			expect(button.busy).to.be.false;
		});

		it('should finish after promise fails', (): void => {
			deferred.reject();
			scope.$digest();

			expect(button.busy).to.be.false;
		});
	});

	it('should not allow triggers while busy', (): void => {
		button = buildController(true);

		expect(button.busy).to.be.true;

		button.trigger();

		sinon.assert.notCalled(actionSpy);
	});

	function buildController(busy: boolean = false): ButtonAsyncController {
		var controllerResult: test.IControllerResult<ButtonAsyncController>
			= test.angularFixture.controllerWithBindings<ButtonAsyncController>(controllerName, { busy: busy, action: actionSpy });

		scope = controllerResult.scope;
		return controllerResult.controller;
	}
});
