import * as angular from 'angular';

export const moduleName: string = 'FormTestModule';

class FormTestController {
	count: number;

	static $inject: string[] = ['$q', '$timeout'];
	constructor(private $q: angular.IQService, private $timeout: angular.ITimeoutService) {}

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
