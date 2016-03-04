/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import { moduleName, serviceName, IDialogService, IDialogServiceProvider, bootstrapModalDialog } from './dialog.service';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IDialogMock {
	open: Sinon.SinonSpy;
}

describe('dialog', () => {
	var dialog: IDialogService<any>;
	var testImplementation: IDialogMock;

	beforeEach(() => {
		testImplementation = {
			open: sinon.spy(),
		};

		angular.mock.module(moduleName, (dialogProvider: IDialogServiceProvider<any>): void => {
			dialogProvider.setImplementation(testImplementation);
		});

		let mocks: any = {};
		mocks[bootstrapModalDialog.serviceName] = {};
		test.angularFixture.mock(mocks);

		var services: any = test.angularFixture.inject(serviceName);
		dialog = services[serviceName];
	});

	it('should open a dialog using the configured implementation', (): void => {
		var options: any = {
			scope: {},
			controller: 'controller',
			resolve: {},
			size: 'sm',
			template: '<div></div>'
		};
		dialog.open(options);
		sinon.assert.calledOnce(testImplementation.open);
		sinon.assert.calledWith(testImplementation.open, options);
	});
});
