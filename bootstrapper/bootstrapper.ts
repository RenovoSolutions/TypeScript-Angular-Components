import * as angular from 'angular';

import { moduleName as inputModuleName } from './inputs/inputBootstrapper';
import { moduleName as buttonModuleName } from './buttons/buttonBootstrapper';
import { moduleName as popupModuleName } from './popup/popupBootstrapper';
import { moduleName as messageLogModuleName } from './messageLog/messageLogBootstrapper';
import { moduleName as cardModuleName } from './cards/cardContainerBootstrapper';
import { moduleName as tabModuleName } from './tabs/tabsBootstrapper';
import { moduleName as formModuleName } from './forms/formsBootstrapper';
import { moduleName as miscModuleName } from './misc/miscBootstrapper';
import { moduleName as textModuleName } from './text/text';

import { moduleName as componentsModule } from '../source/ui.module';

const inputsTemplate = require('./inputs/inputs.html');
const buttonsTemplate = require('./buttons/buttons.html');
const popupTemplate = require('./popup/popup.html');
const cardsTemplate = require('./cards/cards.html');
const tabsTemplate = require('./tabs/tabs.html');
const formsTemplate = require('./forms/forms.html');
const messageLogTemplate = require('./messageLog/messageLogTest.html');
const miscTemplate = require('./misc/misc.html');

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
	.config(RouteConfig);

RouteConfig.$inject = ['$urlRouterProvider', '$stateProvider'];
function RouteConfig($urlRouterProvider, $stateProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
		.state('/', {
			url: '/',
			template: '<h3>Welcome to typescript-angular-components</h3>',
		})
		.state('inputs', {
			url: '/inputs',
			template: inputsTemplate,
			controller: 'InputTestController',
			controllerAs: 'input',
		})
		.state('buttons', {
			url: '/buttons',
			template: buttonsTemplate,
			controller: 'ButtonTestController',
			controllerAs: 'button',
		})
		.state('popup', {
			url: '/popup',
			template: popupTemplate,
			controller: 'PopupTestController',
			controllerAs: 'popup',
		})
		.state('cards', {
			url: '/cards',
			template: cardsTemplate,
			controller: 'CardTestController',
			controllerAs: 'cards',
		})
		.state('tabs', {
			url: '/tabs',
			template: tabsTemplate,
			controller: 'TabTestController',
			controllerAs: 'tabs',
		})
		.state('forms', {
			url: '/forms',
			template: formsTemplate,
			controller: 'FormTestController',
			controllerAs: 'forms',
		})
		.state('messageLog', {
			url: '/messageLog',
			template: messageLogTemplate,
			controller: 'MessageLogTestController',
			controllerAs: 'messageLog',
		})
		.state('misc', {
			url: '/misc',
			template: miscTemplate,
			controller: 'MiscTestController',
			controllerAs: 'misc',
		});
}
