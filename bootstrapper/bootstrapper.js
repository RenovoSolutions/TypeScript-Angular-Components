(function() {
	var __timezone = rl_utilities.services.timezone;

	angular.module('app', ['rl.ui', 'ui.router'])
		.controller('InputTestController', InputTestController)
		.controller('ButtonTestController', ButtonTestController)
		.controller('PopupTestController', PopupTestController)
		.controller('CardTestController', CardTestController)
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
				templateUrl: 'bootstrapper/inputs.html',
				controller: 'InputTestController',
				controllerAs: 'input',
			})
			.state('buttons', {
				url: '/buttons',
				templateUrl: 'bootstrapper/buttons.html',
				controller: 'ButtonTestController',
				controllerAs: 'button',
			})
			.state('popup', {
				url: '/popup',
				templateUrl: 'bootstrapper/popup.html',
				controller: 'PopupTestController',
				controllerAs: 'popup',
			})
			.state('cards', {
				url: '/cards',
				templateUrl: 'bootstrapper/cards.html',
				controller: 'CardTestController',
				controllerAs: 'cards',
			})
			.state('tabs', {
				url: '/tabs',
				templateUrl: 'bootstrapper/tabs.html',
				controller: 'TabTestController',
				controllerAs: 'tabs',
			})
			.state('forms', {
				url: '/forms',
				templateUrl: 'bootstrapper/forms.html',
				controller: 'FormTestController',
				controllerAs: 'forms',
			})
			.state('misc', {
				url: '/misc',
				templateUrl: 'bootstrapper/misc.html',
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

	function ButtonTestController() {
		var self = this;
		self.action = function(name) {
			console.log('Action: ' + name);
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

	CardTestController.$inject = ['cardContainerBuilder'];
	function CardTestController(cardContainerBuilderFactory) {
		var self = this;
		var items = [
			{ name: 'Item 1', value: 1 },
			{ name: 'Item 2', value: 2 },
			{ name: 'Item 3', value: 1 },
			{ name: 'Item 4', value: 1 },
			{ name: 'Item 5', value: 2 },
			{ name: 'Item 6', value: 2 },
		];

		self.builder = cardContainerBuilderFactory.getInstance();
		self.builder.dataSource.buildSimpleDataSource(items);
		self.builder.addColumn({
			label: 'Name',
			size: 6,
			getValue: function (item) {
				return item.name;
			},
		});
		self.builder.addColumn({
			label: 'Value',
			size: 6,
			getValue: function (item) {
				return item.value;
			},
			template: '<b>{{myItem.value}}</b>',
		});
		self.builder.renderFilters();
		self.builder.filters.buildModeFilterGroup({
			label: "Mode Filter",
			type: "modeFilter",
			getValue: 'value',
			options: [
				{
					label: "All",
					displayAll: true,
				},
				{
					label: "1",
					value: 1,
				},
				{
					label: "2",
					value: 2,
				},
			],
		});
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

		self.date = moment('2016-04-01T12:00:00.000-08:00').tz('US/Pacific');
	}
}());