/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />
/// <reference path='../../../typings/lodash/lodash.d.ts' />

'use strict';

import { IAutosaveAttributes, AutosaveController, IAutosaveBehavior, moduleName, controllerName } from './autosave';

import { services } from 'typescript-angular-utilities';

import * as angular from 'angular';
import 'angular-mocks';

module rl.ui.behaviors.autosave {
	import test = services.test;
	import __parentChild = services.parentChildBehavior;

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

	interface IChildLinkMock extends __parentChild.IChild<any> {}

	describe('AutosaveController', () => {
		var scope: IParentScope;
		var autosave: AutosaveController;
		var parentChildBehavior: __parentChild.IParentChildBehaviorService;
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

			var services: any = test.angularFixture.inject(__parentChild.serviceName);
			parentChildBehavior = services[__parentChild.serviceName];
		});

		it('should trigger an autosave when the autosave behavior is called', (): void => {
			buildController();

			var behavior: IAutosaveBehavior = parentChildBehavior.getChildBehavior(scope.childLink);

			var close: boolean = behavior.autosave();

			expect(close).to.be.true;

			sinon.assert.calledOnce(autosaveSpy);
		});

		function buildController(): void {
			if (childLink == null) {
				childLink = <any>{};
			}

			var $element: any = {
				controller(): IMockFormController {
					return null;
				},
			};

			var $parse: any = (expression: string): Sinon.SinonSpy => {
				if (expression === 'link') {
					return sinon.spy((): IChildLinkMock => {
						return childLink;
					});
				} else {
					return sinon.spy();
				}
			};

			var controllerResult: test.IControllerResult<AutosaveController>
				= test.angularFixture.controllerWithBindings<AutosaveController>(controllerName
					, null, { $element: $element, $parse: $parse }, { childLink: childLink, });

			scope = <IParentScope>controllerResult.scope;
			autosave = controllerResult.controller;
		}
	});
}
