(function() {
	angular.module('app')
		.controller('CardTestController', CardTestController);

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
}());