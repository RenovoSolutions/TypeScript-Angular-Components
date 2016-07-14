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

MultiStepRoute.$inject = ['$stateProvider'];
function MultiStepRoute($stateProvider) {
	$stateProvider
		.state('msi', {
			url: '/msi',
			template: require('./msi.html'),
		})
		.state('msi.ng1', {
			url: '/ng1',
			template: require('./msi.ng1.html'),
			controller: 'MultiStepTestController',
			controllerAs: 'vm',
		})
		.state('msi.ng2', {
			url: '/ng2',
			template: '<ts-msi-bootstrapper></ts-msi-bootstrapper>',
		});
}

angular.module(moduleName, [])
	.controller('MultiStepTestController', MultiStepTestController)
	.config(MultiStepRoute);