import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __validation = services.validation;

export const moduleName: string = 'FormTestModule';

class FormTestController {
	count: number;
	text: string;
	validator: __validation.IValidationHandler;

	static $inject: string[] = ['$q', '$timeout'];
	constructor(private $q: angular.IQService, private $timeout: angular.ITimeoutService) {}

	$onInit(): void {
		this.validator = {
			validate: () => this.text === 'valid',
			errorMessage: 'String must be valid',
		};
	}

	submit(): angular.IPromise<void>  {
		return this.$timeout((): void => console.log('Submitted'), 1000);
	}

	save(): angular.IPromise<void> {
		this.count++;
		return this.$q.when();
	}
}

FormRoute.$inject = ['$stateProvider'];
function FormRoute($stateProvider) {
	$stateProvider
		.state('forms', {
			url: '/forms',
			template: require('./forms.html'),
			controller: 'FormTestController',
			controllerAs: 'forms',
		});
}

angular.module(moduleName, [])
	.controller('FormTestController', FormTestController)
	.config(FormRoute);
