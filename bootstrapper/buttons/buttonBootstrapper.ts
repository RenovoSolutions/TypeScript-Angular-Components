import * as angular from 'angular';

export const moduleName: string = 'ButtonTestModule';

class ButtonTestController {
	waitCallback: { (): angular.IPromise<void> } = () => {
		return this.wait(this.action, 'Async button');
	}

	static $inject: string[] = ['$timeout'];
	constructor(private $timeout: angular.ITimeoutService) { }

	action(name: string): void {
		console.log('Action: ' + name);
	}

	wait(callback, name): angular.IPromise<void> {
		return this.$timeout(() => callback(name), 1000);
	}
}

ButtonRoute.$inject = ['$stateProvider'];
function ButtonRoute($stateProvider) {
	$stateProvider
		.state('buttons', {
			url: '/buttons',
			template: require('./buttons.html'),
		})
		.state('buttons.ng1', {
			url: '/ng1',
			template: require('./buttonsNg1.html'),
			controller: 'ButtonTestController',
			controllerAs: 'button',
		})
		.state('buttons.ng2', {
			url: '/ng2',
			template: require('./buttonsNg2.html'),
			controller: 'ButtonTestController',
			controllerAs: 'button',
		});
}

angular.module(moduleName, [])
	.controller('ButtonTestController', ButtonTestController)
	.config(ButtonRoute);
