import { Component } from '@angular/core';
import * as angular from 'angular';

import { IStep } from '../../source/components/multiStepIndicator/multiStepIndicator.ng1';

export const moduleName: string = 'MultiStepTestModule';

class MultiStepTestController {
	steps: IStep[];

	$onInit(): void {
		this.steps = [
			{
				title: 'Step 1',
				subtitle: 'Do something',
				onClick: (): void => console.log('Visited step 1'),
			},
			{
				title: 'Step 2',
				subtitle: 'Do more work',
				onClick: (): void => console.log('Visited step 2'),
			},
		];
	}
}

@Component({
	selector: 'tsMsiNg1',
	template: '<ts-msi-ng1></ts-msi-ng1>'
})
export class MsiNg1BootstrapperComponent { }

angular.module(moduleName, [])
	.component('tsMsiNg1', {
		template: require('./msi.ng1.html'),
		controller: 'MultiStepTestController',
		controllerAs: 'vm',
	})
	.controller('MultiStepTestController', MultiStepTestController);
