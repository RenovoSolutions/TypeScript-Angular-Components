import * as angular from 'angular';
import { services } from 'typescript-angular-utilities';
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

const bootstrapper: angular.IComponentOptions = {
	template: require('./app.html'),
}

angular.module('app', [
	componentsModule,
	'ui.router',

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
	.config(BaseRoute)
	.config(notificationConfig);

BaseRoute.$inject = ['$urlRouterProvider', '$stateProvider'];
function BaseRoute($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('/', {
			url: '/',
			template: '<h3>Welcome to typescript-angular-components</h3>',
		});
}

notificationConfig.$inject = [__notification.serviceName + 'Provider'];
function notificationConfig(notificationProvider: __notification.INotificationServiceProvider) {
	notificationProvider.setNotifier({
		success: message => console.log(message),
		info: message => console.log(message),
		warning: message => console.log(message),
		error: message => console.error(message),
	});
}
