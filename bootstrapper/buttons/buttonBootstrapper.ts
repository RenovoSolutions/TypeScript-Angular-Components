import { Component } from '@angular/core';
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

@Component({
	selector: 'tsButtonsNg1',
	template: '<ts-buttons-ng1></ts-buttons-ng1>'
})
export class ButtonsNg1BootstrapperComponent { }

@Component({
	selector: 'tsButtonsNg2',
	template: '<ts-buttons-ng2></ts-buttons-ng2>'
})
export class ButtonsNg2BootstrapperComponent {}

angular.module(moduleName, [])
	.component('tsButtonsNg1', {
		template: require('./buttonsNg1.html'),
		controller: 'ButtonTestController',
		controllerAs: 'button',
	})
	.component('tsButtonsNg2', {
		template: require('./buttonsNg2.html'),
		controller: 'ButtonTestController',
		controllerAs: 'button',
	})
	.controller('ButtonTestController', ButtonTestController);
