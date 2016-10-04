import { Component } from '@angular/core';
import * as angular from 'angular';

import { IStep } from '../../source/components/multiStepIndicator/multiStepIndicator';

export const moduleName: string = 'TabTestModule';

class TabTestController {

}

@Component({
	selector: 'tsTabsNg1',
	template: '<ts-tabs-ng1></ts-tabs-ng1>'
})
export class TabsNg1BootstrapperComponent { }

angular.module(moduleName, [])
	.component('tsTabsNg1', {
		template: require('./tabsNg1.html'),
		controller: 'TabTestController',
		controllerAs: 'tabs',
	})
	.controller('TabTestController', TabTestController);
