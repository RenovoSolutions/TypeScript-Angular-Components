(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	function TestController() {
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
	}
}());