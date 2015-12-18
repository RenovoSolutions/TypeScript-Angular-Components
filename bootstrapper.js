(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	TestController.$inject = ['selectFilter'];
	function TestController(selectFilterFactory) {
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
	}
}());