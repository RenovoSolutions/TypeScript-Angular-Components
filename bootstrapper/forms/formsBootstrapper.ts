import { Component, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
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

@Component({
	selector: 'tsFormsNg1Bootstrapper',
	template: '<tsFormsNg1></tsFormsNg1>'
})
export class FormsNg1BootstrapperComponent { }

@Directive({
	selector: 'tsFormsNg1'
})
export class FormsNg1Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsFormsNg1', elementRef, injector);
	}
}

angular.module(moduleName, [])
	.component('tsFormsNg1', {
		template: require('./formsNg1.html'),
		controller: 'FormTestController',
		controllerAs: 'forms',
	})
	.controller('FormTestController', FormTestController);
