import { services } from 'typescript-angular-utilities';
import test = services.test;
import fakeAsync = test.fakeAsync;

import { moduleName, serviceName, BootstrapModalDialogService } from './bootstrapModalDialog.module';
import { IDialogInstance } from '../dialog.service.ng1';

import * as angular from 'angular';
import 'angular-mocks';

interface IModalMock {
	open: Sinon.SinonSpy;
}

describe('bootstrapModalDialog', () => {
	let bootstrapModalDialog: BootstrapModalDialogService;
	let $uibModal: IModalMock;
	let $rootScope: angular.IRootScopeService;
	let $controller: angular.IControllerService;
	let dismissSpy: Sinon.SinonSpy;
	let closeSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		closeSpy = sinon.spy();
		dismissSpy = sinon.spy();

		$uibModal = {
			open: sinon.spy((): any => {
				return {
					close: closeSpy,
					dismiss: dismissSpy,
				};
			}),
		};

		test.angularFixture.mock({
			$uibModal: $uibModal,
		});

		let services: any = test.angularFixture.inject(serviceName, '$rootScope', '$controller');
		bootstrapModalDialog = services[serviceName];
		$rootScope = services.$rootScope;
		$controller = services.$controller;
	});

	it('should call the closeHandler when the dialog closes', (): void => {
		let closeHandler: Sinon.SinonSpy = sinon.spy((): boolean => { return true; });
		bootstrapModalDialog.open(null, closeHandler);
		$rootScope.$digest();

		bootstrapModalDialog.modalClosing(null, null, true);

		sinon.assert.calledOnce(closeHandler);
		sinon.assert.calledWith(closeHandler, true);
	});

	it('should prevent the dialog from closing if the close handler returns false', (): void => {
		let closeHandler: Sinon.SinonSpy = sinon.spy((): boolean => { return false; });
		bootstrapModalDialog.open(null, closeHandler);
		$rootScope.$digest();

		let event: any = {
			preventDefault: sinon.spy(),
		};

		bootstrapModalDialog.modalClosing(event, null, false);

		sinon.assert.calledOnce(closeHandler);
		sinon.assert.calledOnce(event.preventDefault);
	});

	it('should resolve promises and provide the results as locals on the dialog controller', fakeAsync(() => {
		let data: any = { prop: 5 };
		let dataService: any = {
			get: test.mock.promise(data),
		};

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

		bootstrapModalDialog.open(options);

		sinon.assert.notCalled($uibModal.open);
		expect(dataResult).to.not.exist;

		test.mock.flushAll(dataService);
		$rootScope.$digest();
		sinon.assert.calledOnce($uibModal.open);

		$controller(dialogController, options.scope.resolveData);

		expect(dataResult).to.equal(data);
	}));

	it('should not open the dialog if resolve fails', fakeAsync(() => {
		let dataService: any = {
			get: test.mock.rejectedPromise(new Error()),
		};

		let options: any = {
			resolve: {
				data: dataService.get,
			},
		};

		bootstrapModalDialog.open(options);

		test.mock.flushAll(dataService)

		sinon.assert.notCalled($uibModal.open);
	}));

	it('should return an object with functions to dismiss and close the dialog once its open', fakeAsync((): void => {
		const options: any = {
			resolve: {
				data: test.mock.promise<void>(),
			},
		};

		let dialogInstance: IDialogInstance = bootstrapModalDialog.open(options);

		dialogInstance.close();
		dialogInstance.dismiss();

		sinon.assert.notCalled(closeSpy);
		sinon.assert.notCalled(dismissSpy);

		options.resolve.data.flush()
		$rootScope.$digest();
		dialogInstance.close();
		dialogInstance.dismiss();

		sinon.assert.calledOnce(closeSpy);
		sinon.assert.calledOnce(dismissSpy);
	}));
});
