/// <reference path='../../../../typings/chai/chai.d.ts' />
/// <reference path='../../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import { moduleName, serviceName, BaseDialogService } from './baseDialog.module';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IModalMock {
	open: Sinon.SinonSpy;
}

describe('baseDialog', () => {
	let baseDialog: BaseDialogService;
	let $modal: IModalMock;
	let mock: test.mock.IMock;
	let $rootScope: angular.IRootScopeService;
	let $controller: angular.IControllerService;

	beforeEach(() => {
		angular.mock.module(moduleName);
		angular.mock.module(test.mock.moduleName);

		$modal = {
			open: sinon.spy(),
		};

		test.angularFixture.mock({
			$modal: $modal,
		});

		let services: any = test.angularFixture.inject(serviceName, test.mock.serviceName, '$rootScope', '$controller');
		baseDialog = services[serviceName];
		mock = services[test.mock.serviceName];
		$rootScope = services.$rootScope;
		$controller = services.$controller;
	});

	it('should call the closeHandler when the dialog closes', (): void => {
		let closeHandler: Sinon.SinonSpy = sinon.spy((): boolean => { return true; });
		baseDialog.open(null, closeHandler);
		$rootScope.$digest();

		baseDialog.modalClosing(null, null, true);

		sinon.assert.calledOnce(closeHandler);
		sinon.assert.calledWith(closeHandler, true);
	});

	it('should prevent the dialog from closing if the close handler returns false', (): void => {
		let closeHandler: Sinon.SinonSpy = sinon.spy((): boolean => { return false; });
		baseDialog.open(null, closeHandler);
		$rootScope.$digest();

		let event: any = {
			preventDefault: sinon.spy(),
		};

		baseDialog.modalClosing(event, null, false);

		sinon.assert.calledOnce(closeHandler);
		sinon.assert.calledOnce(event.preventDefault);
	});

	it('should resolve promises and provide the results as locals on the dialog controller', (): void => {
		let dataService: any = mock.service();
		let data: any = { prop: 5 };
		mock.promise(dataService, 'get', data);

		let dataResult: any;

		let dialogController: Function = (data: any): void => {
			dataResult = data;
		};
		dialogController.$inject = ['data'];

		let options: any = {
			controller: dialogController,
			resolve: {
				data: dataService.get,
			},
		};

		baseDialog.open(options);

		sinon.assert.notCalled($modal.open);
		expect(dataResult).to.not.exist;

		mock.flush(dataService);

		sinon.assert.calledOnce($modal.open);

		$controller(dialogController, options.scope.resolveData);

		expect(dataResult).to.equal(data);
	});

	it('should not open the dialog if resolve fails', (): void => {
		let dataService: any = mock.service();
		mock.promise(dataService, 'get', {}, false);

		let options: any = {
			resolve: {
				data: dataService.get,
			},
		};

		baseDialog.open(options);

		mock.flush(dataService);

		sinon.assert.notCalled($modal.open);
	});
});
