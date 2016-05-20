import 'jquery';
import * as angular from 'angular';
import 'angular-ui-router';

import { UpgradeAdapter } from '@angular/upgrade';

import { services, downgrade } from 'typescript-angular-utilities';
import __notification = services.notification;

import { moduleName as componentsModule } from '../source/ui.module';

import { moduleName as inputModuleName } from './inputs/inputBootstrapper';
import { moduleName as buttonModuleName } from './buttons/buttonBootstrapper';
import { moduleName as popupModuleName } from './popup/popupBootstrapper';
import { moduleName as messageLogModuleName } from './messageLog/messageLogBootstrapper';
import { moduleName as cardModuleName } from './cards/cardContainerBootstrapper';
import { moduleName as tabModuleName } from './tabs/tabsBootstrapper';
import { moduleName as formModuleName } from './forms/formsBootstrapper';
import { moduleName as miscModuleName } from './misc/miscBootstrapper';
import { moduleName as textModuleName } from './text/text';

const upgradeAdapter: UpgradeAdapter = new UpgradeAdapter();
downgrade.downgradeUtilitiesToAngular1(upgradeAdapter);

const bootstrapper: angular.IComponentOptions = {
	template: require('./app.html'),
}

const moduleName: string = 'bootstrapper-app';

angular.module(moduleName, [
	componentsModule,
	'ui.router',

	downgrade.moduleName,

	inputModuleName,
	buttonModuleName,
	popupModuleName,
	messageLogModuleName,
	cardModuleName,
	tabModuleName,
	formModuleName,
	miscModuleName,
	textModuleName,
])
	.component('tsBootstrapper', bootstrapper)
	.config(BaseRoute);

BaseRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
function BaseRoute($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('/', {
			url: '/',
			template: '<h3>Welcome to typescript-angular-components</h3>',
		});
}

upgradeAdapter.bootstrap(document.body, [moduleName]);
