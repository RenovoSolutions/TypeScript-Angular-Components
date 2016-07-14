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
		})
		.state('tabs.ng1', {
			url: '/ng1',
			template: require('./tabsNg1.html'),
			controller: 'TabTestController',
			controllerAs: 'tabs',
		})
		.state('tabs.ng2', {
			url: '/ng2',
			template: '<ts-tabs-bootstrapper></ts-tabs-bootstrapper>',
		});
}

angular.module(moduleName, [])
	.controller('TabTestController', TabTestController)
	.config(TabRoute);