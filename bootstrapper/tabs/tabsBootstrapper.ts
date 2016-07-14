import * as angular from 'angular';

import { IStep } from '../../source/components/multiStepIndicator/multiStepIndicator';

export const moduleName: string = 'TabTestModule';

class TabTestController {

}

TabRoute.$inject = ['$stateProvider'];
function TabRoute($stateProvider) {
	$stateProvider
		.state('tabs', {
			url: '/tabs',
			template: require('./tabs.html'),
			controller: 'TabTestController',
			controllerAs: 'tabs',
		});
}

angular.module(moduleName, [])
	.controller('TabTestController', TabTestController)
	.config(TabRoute);