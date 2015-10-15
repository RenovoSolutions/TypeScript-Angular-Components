/// <reference path='../../../typings/chai/chai.d.ts' />
/// <reference path='../../../typings/mocha/mocha.d.ts' />
/// <reference path='../../../typings/sinon/sinon.d.ts' />
/// <reference path='../../../typings/chaiAssertions.d.ts' />

'use strict';

import { services } from 'typescript-angular-utilities';

import {
	moduleName,
	controllerName,
	MultiStepIndicatorController,
	IStep,
} from './multiStepIndicator';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;

interface IStateServiceMock {
	go: Sinon.SinonSpy;
	includes: Sinon.SinonSpy;
}

describe('MultiStepIndicatorController', () => {
	let scope: angular.IScope;
	let multiStepIndicator: MultiStepIndicatorController;
	let stateMock: IStateServiceMock;
	let $q: angular.IQService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject('$q');
		$q = services.$q;

		stateMock = {
			go: sinon.spy((): angular.IPromise<any> => { return $q.when(); }),
			includes: sinon.spy((): boolean => { return false; }),
		};
	});

	it('should set inactive to true if no click handler or state name is provided', (): void => {
		let step: IStep = <any>{};
		buildController([step]);
		expect((<any>step).inactive).to.be.true;
	});

	it('should provide a default click handler that redirects to the specified state and sets the step to current if a state name is provided', (): void => {
		let step: IStep = <any>{ stateName: 'state' };
		buildController([step]);

		step.onClick();

		sinon.assert.calledOnce(stateMock.go);
		sinon.assert.calledWith(stateMock.go, 'state');

		scope.$digest();

		expect(step.isCurrent).to.be.true;
	});

	it('should set the step to current if the specified state is already active', (): void => {
		let step1: IStep = <any>{ stateName: 'state2', isCurrent: false };
		let step2: IStep = <any>{ stateName: 'state1', isCurrent: false };
		stateMock.includes = sinon.spy((name: string): boolean => { return name === step1.stateName; });
		buildController([step1, step2]);

		expect(step1.isCurrent).to.be.true;
		expect(step2.isCurrent).to.be.false;
	});

	function buildController(steps: IStep[]): void {
		let controllerResult: test.IControllerResult<MultiStepIndicatorController>
			= test.angularFixture.controllerWithBindings<MultiStepIndicatorController>(controllerName, { steps: steps }, { $state: stateMock });

		scope = <angular.IScope>controllerResult.scope;
		multiStepIndicator = controllerResult.controller;
	}
});
