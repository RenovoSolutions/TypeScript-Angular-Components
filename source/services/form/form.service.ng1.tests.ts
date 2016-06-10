import * as angular from 'angular';
import 'angular-mocks';

import { services as utilityServices } from 'typescript-angular-utilities';
import __test = utilityServices.test;

import { moduleName, serviceName, IFormService } from './form.service.ng1';

describe('form service', (): void => {
	let formService: IFormService;

	beforeEach(() => {
		angular.mock.module(moduleName);

		let services: any = __test.angularFixture.inject(serviceName);
		formService = services[serviceName];
	});

	it('should get the first error message from a child of the form', (): void => {
		let form: any = {
			prop1: {},
			prop2: {},
			ngModel1: { rlErrorMessage: 'error1' },
			ngModel2: { rlErrorMessage: 'error2' },
		};
		expect(formService.getAggregateError(form)).to.equal('error1');
	});
});
