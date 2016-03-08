(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	TestController.$inject = ['$scope', '$q', 'cardContainerBuilder'];
	function TestController($scope, $q, cardContainerBuilderFactory) {
		var self = this;
		self.popover = '<div>{{test.content}}</div>';
		self.content = 'Some content';

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
		self.validator = {
			validate: function () {
				return self.text === 'valid';
			},
			errorMessage: 'String must be valid',
		};
		var items = [
			{ name: 'Item 1', value: 1 },
			{ name: 'Item 2', value: 2 },
			{ name: 'Item 3', value: 3 },
			{ name: 'Item 4', value: 4 },
			{ name: 'Item 5', value: 5 },
			{ name: 'Item 6', value: 6 },
		];

		self.count = 0;
		self.save = function () {
			self.count++;
			$scope.myForm.$setPristine();
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
		});
	}
}());