import { services } from 'typescript-angular-utilities';

import { IComponentValidator, IComponentValidatorFactory, moduleName, factoryName } from './componentValidator.service.ng1';

import * as angular from 'angular';
import 'angular-mocks';

import test = services.test;
import __validation = services.validation;

describe('componentValidator', () => {
	let componentValidator: IComponentValidator;
	let componentValidatorFactory: IComponentValidatorFactory;
	let $rootScope: angular.IRootScopeService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = test.angularFixture.inject(factoryName, '$rootScope');
		componentValidatorFactory = services[factoryName];
		$rootScope = services.$rootScope;
	});

	it('should watch for validation errors', (): void => {
		let validator: __validation.IValidationHandler = {
			validate: sinon.spy((): boolean => { return false; }),
			errorMessage: 'error',
		};

		let ngModel: any = {
			$setValidity: sinon.spy(),
		};

		componentValidator = componentValidatorFactory.getInstance({
			ngModel: ngModel,
			$scope: $rootScope.$new(),
			validators: [validator],
		});

		$rootScope.$digest();

		expect(componentValidator.error).to.equal('error');
		sinon.assert.calledOnce(ngModel.$setValidity);
		sinon.assert.calledWith(ngModel.$setValidity, 'customValidation', false);
	});
});
