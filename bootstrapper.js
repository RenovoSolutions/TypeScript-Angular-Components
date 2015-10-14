(function () {
	angular.module('app', ['rl.ui'])
		.controller('TestController', TestController);

	function TestController() {
		var self = this;
		self.text = null;
	}
}());