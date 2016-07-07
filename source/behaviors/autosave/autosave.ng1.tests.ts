import { IAutosaveAttributes, AutosaveController, IAutosaveBehavior, moduleName, controllerName } from './autosave.ng1';

import { services } from 'typescript-angular-utilities';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

import { IChild, IParentChildBehaviorService, serviceName as parentChildServiceName } from '../../services/parentChild/parentChild.service';

interface IAutosaveServiceMock {
	autosave: Sinon.SinonSpy;
}

interface IParentScope extends angular.IScope {
	childLink: IChildLinkMock;
}

interface IMockFormController {
	$pristine: boolean;
	$setPristine: Sinon.SinonSpy;
}

interface IChildLinkMock extends IChild<any> {}

describe('AutosaveController', () => {
	var scope: IParentScope;
	var autosave: AutosaveController;
	var parentChildBehavior: IParentChildBehaviorService;
	var $attrs: IAutosaveAttributes;
	var autosaveSpy: Sinon.SinonSpy;
	var childLink: IChildLinkMock;

	beforeEach(() => {
		angular.mock.module(moduleName);

		$attrs = <any>{
			validate: '',
			rlAutosave: 'link',
		};

		autosaveSpy = sinon.spy((): boolean => { return true; });
		var autosaveService: IAutosaveServiceMock = { autosave: autosaveSpy };

		var autosaveFactory: any = {
			getInstance: sinon.spy((save: any, contentForm: any, validate: any) => {
				return autosaveService;
			}),
		};

		test.angularFixture.mock({
			$attrs: $attrs,
			autosaveFactory: autosaveFactory,
		});

		var services: any = test.angularFixture.inject(parentChildServiceName);
		parentChildBehavior = services[parentChildServiceName];
	});

	it('should trigger an autosave when the autosave behavior is called', (): void => {
		buildController();
		scope.$digest();

		var behavior: IAutosaveBehavior = parentChildBehavior.getChildBehavior(scope.childLink);

		var close: boolean = behavior.autosave();

		expect(close).to.be.true;

		sinon.assert.calledOnce(autosaveSpy);
	});

	function buildController(): void {
		if (childLink == null) {
			childLink = <any>{};
		}

		var $parse: any = (expression: string): Sinon.SinonSpy => {
			if (expression === 'link') {
				return sinon.spy((): IChildLinkMock => {
					return childLink;
				});
			} else {
				return sinon.spy();
			}
		};

		var bindings: any = {
			keyupListener: sinon.spy(),
			autosaveController: {},
		}

		var controllerResult: test.IControllerResult<AutosaveController>
			= test.angularFixture.controllerWithBindings<AutosaveController>(controllerName
				, bindings, { $element: {}, $parse: $parse }, { childLink: childLink, });

		scope = <IParentScope>controllerResult.scope;
		autosave = controllerResult.controller;
		autosave.$onInit();
	}
});
