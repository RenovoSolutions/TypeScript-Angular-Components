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

angular.module(moduleName, [])
	.controller('FormTestController', FormTestController);
