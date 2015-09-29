/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	IAutosaveDialogScope,
	AutosaveDialogController,
} from './autosaveDialog.module';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IAutosaveMock {
	autosave: Sinon.SinonSpy;
	contentForm?: any;
}

describe('AutosaveDialogController', () => {
	var scope: IAutosaveDialogScope;
	var dialog: AutosaveDialogController;
	var setForm: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(moduleName);

		setForm = sinon.spy();
	});

	it('should set the form if a form name is specified', (): void => {
		var form: any = {};
		var formName: string = 'myForm';
		buildController(null, form, formName);

		scope.$digest();

		sinon.assert.calledOnce(setForm);
		sinon.assert.calledWith(setForm, form);
	});

	it('should set the form if a formGetter is specified', (): void => {
		var form: any = {};
		var formGetter: Sinon.SinonSpy = sinon.spy((): any => { return form; });
		buildController(formGetter);

		scope.$digest();

		sinon.assert.calledOnce(formGetter);
		sinon.assert.calledOnce(setForm);
		sinon.assert.calledWith(setForm, form);
	});

	function buildController(formGetter?: Sinon.SinonSpy, form?: any, formName?: string): void {
		var newScope: any = {
			form: formName,
			formGetter: formGetter,
			setForm: setForm,
		};

		if (formName != null) {
			newScope[formName] = form;
		}

		var controllerResult: test.IControllerResult<AutosaveDialogController>
			= test.angularFixture.controllerWithBindings<AutosaveDialogController>(controllerName, null, null, newScope);

		scope = <IAutosaveDialogScope>controllerResult.scope;
		dialog = controllerResult.controller;
	}
});
