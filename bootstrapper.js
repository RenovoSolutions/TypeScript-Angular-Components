(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	TestController.$inject = ['selectFilter', 'cardContainerBuilder'];
	function TestController(selectFilterFactory, cardContainerBuilderFactory) {
		var self = this;
		self.text = null;
		self.options = [
			{ name: 'item1' },
			{ name: 'item2' },
			{ name: 'item3' },
			{ name: 'item4' },
			{ name: 'item5' },
		];
		self.validator = {
			validate: function () {
				return self.text === 'valid';
			},
			errorMessage: 'String must be valid',
		};
		self.filter = selectFilterFactory.getInstance('value');
		self.filterOptions = [
			{  display: 1},
			{  display: 2},
			{ display: 3},
			{ display: 4},
			{ display: 5}

		];

		var items = [
			{ name: 'Item 1', value: 1 },
			{ name: 'Item 2', value: 2 },
			{ name: 'Item 3', value: 3 },
			{ name: 'Item 4', value: 4 },
			{ name: 'Item 5', value: 5 },
			{ name: 'Item 6', value: 6 },
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
		});
	}
}());