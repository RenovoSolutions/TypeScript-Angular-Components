import { Component, Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { IStep } from '../../source/components/multiStepIndicator/multiStepIndicator';

export const moduleName: string = 'TabTestModule';

@Component({
	selector: 'tsTabsNg1Bootstrapper',
	template: '<tsTabsNg1></tsTabsNg1>'
})
export class TabsNg1BootstrapperComponent { }

@Directive({
	selector: 'tsTabsNg1'
})
export class TabsNg1Directive extends UpgradeComponent {
	constructor(elementRef: ElementRef, injector: Injector) {
		super('tsTabsNg1', elementRef, injector);
	}
}

angular.module(moduleName, [])
	.component('tsTabsNg1', {
		template: require('./tabsNg1.html'),
	});
