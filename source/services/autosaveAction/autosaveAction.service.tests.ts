import { services } from 'typescript-angular-utilities';
import test = services.test;

import { IAutosaveActionService, moduleName, serviceName } from './autosaveAction.service';

import * as ng from 'angular';
import 'angular-mocks';

describe('autosaveAction', () => {
	var autosaveAction: IAutosaveActionService;
	var $timeout: ng.ITimeoutService;
	var $q: ng.IQService;
	var $rootScope: ng.IScope;
	var deferred: ng.IDeferred<void>;

	beforeEach(() => {
		ng.mock.module(moduleName);

		var services: any = test.angularFixture.inject(serviceName, '$timeout', '$q', '$rootScope');
		autosaveAction = services[serviceName];
		$timeout = services.$timeout;
		$q = services.$q;
		$rootScope = services.$rootScope;

		deferred = $q.defer<void>();

		autosaveAction.trigger(deferred.promise);

		expect(autosaveAction.saving).to.be.true;
	});

	it('should set successful to true if the promise resolves successfully', (): void => {
		deferred.resolve();
		$rootScope.$digest();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.true;
	});

	it('should set successful to false if the promise fails', (): void => {
		deferred.reject();
		$rootScope.$digest();

		expect(autosaveAction.saving).to.be.false;
		expect(autosaveAction.complete).to.be.true;
		expect(autosaveAction.successful).to.be.false;
	});

	it('should set complete to false after 1 second', (): void => {
		deferred.resolve();
		$rootScope.$digest();

		expect(autosaveAction.complete).to.be.true;

		$timeout.flush(1000);

		expect(autosaveAction.complete).to.be.false;
	});
});
