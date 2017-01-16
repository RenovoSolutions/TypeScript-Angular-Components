import { Component, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
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
	selector: 'tsButtonsNg1Bootstrapper',
	template: '<tsButtonsNg1></tsButtonsNg1>'
})
export class ButtonsNg1BootstrapperComponent { }

@Directive({
	selector: 'tsButtonsNg1'
})
export class ButtonsNg1Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsButtonsNg1', elementRef, injector);
	}
}

angular.module(moduleName, [])
	.component('tsButtonsNg1', {
		template: require('./buttonsNg1.html'),
		controller: 'ButtonTestController',
		controllerAs: 'button',
	})
	.controller('ButtonTestController', ButtonTestController);
