import { services } from 'typescript-angular-utilities';
import test = services.test;

import {
	moduleName,
	controllerName,
	MultiStepIndicatorController,
	IStep,
	IConfiguredStep,
} from './multiStepIndicator.ng1';

import * as angular from 'angular';
import 'angular-mocks';

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

	it('should show a spinner on the step and disable all clicks when the step is loading', (): void => {
		let step1: IConfiguredStep = <any>{ onClick: sinon.spy(), };
		let step2: IConfiguredStep = <any>{ onClick: sinon.spy(), };
		buildController([step1, step2]);

		multiStepIndicator.onClick(step1);

		sinon.assert.calledOnce(<Sinon.SinonSpy>step1.onClick);
		expect(step1.loading).to.be.true;

		multiStepIndicator.onClick(step2);

		sinon.assert.notCalled(<Sinon.SinonSpy>step2.onClick);
	});

	it('should clear the spinner when the promise resolves', (): void => {
		let step1: IConfiguredStep = <any>{ onClick: sinon.spy(), };
		buildController([step1]);

		multiStepIndicator.onClick(step1);

		sinon.assert.calledOnce(<Sinon.SinonSpy>step1.onClick);
		expect(step1.loading).to.be.true;

		scope.$digest();

		expect(step1.loading).to.be.false;
	});

	it('should allow for specifying isCompleted as a bool or a function', (): void => {
		let step1: IConfiguredStep = <any>{ isCompleted: true, };
		let step2: IConfiguredStep = <any>{ isCompleted: sinon.spy((): boolean => { return true; }), };
		buildController([step1, step2]);

		expect(step1.getCompleted()).to.be.true;
		expect(step2.getCompleted()).to.be.true;

		sinon.assert.calledOnce(<Sinon.SinonSpy>step2.isCompleted);
	});

	function buildController(steps: IStep[]): void {
		let controllerResult: test.IControllerResult<MultiStepIndicatorController>
			= test.angularFixture.controllerWithBindings<MultiStepIndicatorController>(controllerName, { steps: steps }, { $state: stateMock });

		scope = <angular.IScope>controllerResult.scope;
		multiStepIndicator = controllerResult.controller;
	}
});
