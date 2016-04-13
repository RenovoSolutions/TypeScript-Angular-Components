import { services } from 'typescript-angular-utilities';
import __timezone = services.timezone;

import * as inputsTemplate from './inputs.html';
import * as buttonsTemplate from './buttons.html';
import * as popupTemplate from './popup.html';
import * as cardsTemplate from './cards.html';
import * as tabsTemplate from './tabs.html';
import * as formsTemplate from './forms.html';
import * as messageLogTemplate from './messageLog/messageLogTest.html';
import * as miscTemplate from './misc.html';

angular.module('app', ['rl.ui', 'ui.router'])
	.controller('InputTestController', InputTestController)
	.controller('ButtonTestController', ButtonTestController)
	.controller('PopupTestController', PopupTestController)
	.controller('TabTestController', TabTestController)
	.controller('FormTestController', FormTestController)
	.controller('MiscTestController', MiscTestController)
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

InputTestController.$inject = ['$q'];
function InputTestController($q) {
	var self = this;
	self.set = [];
	self.select = function (value) {
		self.set.push(value);
	}
	self.create = function (value) {
		return {
			name: value,
		};
	};
	self.options = [
		{ name: 'item1' },
		{ name: 'item2' },
		{ name: 'item3' },
		{ name: 'item4' },
		{ name: 'item5' },
	];
	self.getOptions = function () {
		return $q.when(_.clone(self.options));
	}
	self.typeaheadList = [self.options[0], self.options[4]];
	self.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
	__timezone.timezoneService.setCurrentTimezone('-08:00');

	self.logDates = function() {
		var format = 'YYYY-MM-DDTHH:mm:ssZ';
		console.log(self.date.format(format));
		console.log(self.date2.format(format));
	}
}

ButtonTestController.$inject = ['$timeout'];
function ButtonTestController($timeout) {
	var self = this;
	self.action = function(name) {
		console.log('Action: ' + name);
	};
	self.wait = function(callback, name) {
		return $timeout(function() { callback(name) }, 1000);
	};
}

PopupTestController.$inject = ['dialog'];
function PopupTestController(dialog) {
	var self = this;
	self.popover = '<div>{{popup.content}}</div>';
	self.content = 'Some content';

	self.prompt = function() {
		dialog.prompt({
			acceptHandler: function() { alert('Yes'); },
			cancelHandler: function() { alert('No'); },
			okButton: 'Yes',
			cancelButton: 'No',
			message: 'Do you want to do this?',
		});
	};

	self.openDialog = function() {
		dialog.open({
			template: '<rl-dialog>' +
						'<rl-dialog-header>Header</rl-dialog-header>' +
						'<rl-dialog-content>Content</rl-dialog-content>' +
						'<rl-dialog-footer>Footer</rl-dialog-footer>' +
					'</rl-dialog > ',
		});
	};
}

function TabTestController() {
	var self = this;
	self.steps = [
		{
			title: 'Step 1',
			subtitle: 'Do something',
			onClick: function() { console.log('Visited step 1'); },
		},
		{
			title: 'Step 2',
			subtitle: 'Do more work',
			onClick: function() { console.log('Visited step 2'); },
		},
	];
}

FormTestController.$inject = ['$q', '$timeout'];
function FormTestController($q, $timeout) {
	var self = this;
	self.submit = function() {
		return $timeout(function() {
			console.log('Submitted');
		}, 1000);
	}

	self.count = 0;
	self.save = function () {
		self.count++;
		return $q.when();
	};
}

MiscTestController.$inject = ['$scope', '$q', '$timeout', 'dialog', 'cardContainerBuilder'];
function MiscTestController($scope, $q, $timeout, dialog, cardContainerBuilderFactory) {
	var self = this;
	// Misc
	self.myNum = 2;
	self.myValue = 1;

	self.validator = {
		validate: function () {
			return self.text === 'valid';
		},
		errorMessage: 'String must be valid',
	};

	var templateScope = $scope.$new();
	templateScope.text = 'Some text';
	self.template = {
		template: '<div>{{text}}</div>',
		scope: templateScope,
	};

	self.number = 5;

	self.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');

	var unbind = $scope.$watch('misc.lazyLoad', function(value) {
		if (value) {
			self.initialized = true;
			unbind();
		}
	});
}