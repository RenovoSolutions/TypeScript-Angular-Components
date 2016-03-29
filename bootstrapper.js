(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	TestController.$inject = ['$scope', '$q', '$timeout', 'dialog', 'cardContainerBuilder'];
	function TestController($scope, $q, $timeout, dialog, cardContainerBuilderFactory) {
		var self = this;
		self.popover = '<div>{{test.content}}</div>';
		self.content = 'Some content';

		var templateScope = $scope.$new();
		templateScope.text = 'Some text';
		self.template = {
			template: '<div>{{text}}</div>',
			scope: templateScope,
		};

		$scope.$watch('testForm', function(form) {
			console.log(form);
		});

		self.submit = function() {
			return $timeout(function() {
				console.log('Submitted');
			}, 1000);
		}

		self.text = null;
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

		self.validator = {
			validate: function () {
				return self.text === 'valid';
			},
			errorMessage: 'String must be valid',
		};

		self.action = function(name) {
			console.log('Action: ' + name);
		}

		self.prompt = function() {
			dialog.prompt({
				acceptHandler: function() { alert('Yes'); },
				cancelHandler: function() { alert('No'); },
				okButton: 'Yes',
				cancelButton: 'No',
				message: 'Do you want to do this?',
			});
		}

		var items = [
			{ name: 'Item 1', value: 1 },
			{ name: 'Item 2', value: 2 },
			{ name: 'Item 3', value: 1 },
			{ name: 'Item 4', value: 1 },
			{ name: 'Item 5', value: 2 },
			{ name: 'Item 6', value: 2 },
		];

		self.count = 0;
		self.save = function () {
			self.count++;
			return $q.when();
		};

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
}());