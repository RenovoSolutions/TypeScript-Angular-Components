/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../typings/angularMocks.d.ts' />
/// <reference path='../../typings/chaiAssertions.d.ts' />

import __autosaveComponentModule = require('./autosaveComponent.module');
import __autosaveComponent = require('./autosaveComponent');
import __parentChildBehavior = require('../../services/parentChildBehavior/parentChildBehavior.service');
import __angularFixture = require('../../test/angularFixture');

interface IAutosaveServiceMock {
	trigger(promise: ng.IPromise<void>): ng.IPromise<void>;
}

describe('AutosaveComponentController', () => {
	var scope: __autosaveComponent.IAutosaveComponentScope;
	var autosaveContent: __autosaveComponent.IAutosaveComponentController;
	var parentChildBehavior: __parentChildBehavior.IParentChildBehaviorService;
	var saveSpy: Sinon.SinonSpy;
	var $attrs: __autosaveComponent.IAutosaveComponentAttributes;
	var triggerSpy: Sinon.SinonSpy;
	var setPristineSpy: Sinon.SinonSpy;

	beforeEach(() => {
		angular.mock.module(__autosaveComponentModule.name);

		$attrs = <any>{
			validate: '',
		};

		triggerSpy = sinon.spy((promise: ng.IPromise<void>): ng.IPromise<void> => { return promise; });
		var autosaveService: IAutosaveServiceMock = { trigger: triggerSpy };

		__angularFixture.angularFixture.mock({
			$attrs: $attrs,
			autosave: autosaveService,
		});

		setPristineSpy = sinon.spy();

		var services: any = __angularFixture.angularFixture.inject(__parentChildBehavior.name, '$q');
		parentChildBehavior = services[__parentChildBehavior.name];
		var $q: ng.IQService = services.$q;

		saveSpy = sinon.spy((): ng.IPromise<void> => { return $q.when(); });
	});

	it('should call save on the parent and set the form to pristine', (): void => {
		buildController();

		var close: boolean = autosaveContent.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);
	});

	it('should save when the autosave behavior is called', (): void => {
		buildController();

		var behavior: __autosaveComponent.IAutosaveBehavior = parentChildBehavior.getChildBehavior(scope.childLink);

		var close: boolean = behavior.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(saveSpy);
	});

	it('should not save if the form is pristine', (): void => {
		buildController();

		scope.contentForm.$pristine = true;

		var close: boolean = autosaveContent.autosave();

		expect(close).to.be.true;

		sinon.assert.notCalled(saveSpy);
	});

	it('should validate using the validator if one exists', (): void => {
		$attrs.validate = 'validator';
		var validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return true; });

		buildController();

		scope.validate = validateSpy;

		var close: boolean = autosaveContent.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.calledOnce(saveSpy);
	});

	it('should return false without saving if validation fails', (): void => {
		$attrs.validate = 'validator';
		var validateSpy: Sinon.SinonSpy = sinon.spy((): boolean => { return false; });

		buildController();

		scope.validate = validateSpy;

		var close: boolean = autosaveContent.autosave();

		expect(close).to.be.false;

		sinon.assert.calledOnce(validateSpy);
		sinon.assert.notCalled(saveSpy);
	});

	function buildController(): void {
		var controllerResult: __angularFixture.IControllerResult<__autosaveComponent.IAutosaveComponentController>
			= __angularFixture.angularFixture.controller<__autosaveComponent.IAutosaveComponentController>(__autosaveComponent.controllerName
				, {
					childLink: {},
					save: saveSpy,
					contentForm: {
						$pristine: false,
						$setPristine: setPristineSpy,
					},
				});

		scope = <__autosaveComponent.IAutosaveComponentScope>controllerResult.scope;
		autosaveContent = controllerResult.controller;
	}
});
