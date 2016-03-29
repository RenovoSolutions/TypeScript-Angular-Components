(function () {
	angular.module('app', ['rl.ui', 'ui.router'])
		.controller('InputController', InputController)
		.controller('ButtonController', ButtonController)
		.controller('PopoverController', PopoverController)
		.controller('CardGroupController', CardGroupController)
		.controller('TabsController', TabsController)
		.controller('FormsController', FormsController)
		.controller('MiscController', MiscController);

	InputController.$inject = ['$q'];
	function InputController($q) {
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
	}

	function ButtonController() {
		var self = this;
		self.action = function(name) {
			console.log('Action: ' + name);
		};
	}

	PopoverController.$inject = ['dialog'];
	function PopoverController(dialog) {
		var self = this;
		self.popover = '<div>{{test.content}}</div>';
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
	}

	CardGroupController.$inject = ['cardContainerBuilder'];
	function CardGroupController(cardContainerBuilderFactory) {
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

	function TabsController() {
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

	FormsController.$inject = ['$q', '$timeout'];
	function FormsController($q, $timeout) {
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

	MiscController.$inject = ['$scope', '$q', '$timeout', 'dialog', 'cardContainerBuilder'];
	function MiscController($scope, $q, $timeout, dialog, cardContainerBuilderFactory) {
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
	}
}());