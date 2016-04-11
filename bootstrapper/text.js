(function() {
	var textComponent = {
		transclude: true,
		template: '<span>{{$ctrl.text}}</span>',
		controller: TextController,
	};

	TextController.$inject = ['$transclude'];
	function TextController($transclude) {
		var self = this;
		$transclude(function(content) {
			self.text = angular.element('<div></div>').append(content).html();
		});
	}

	angular.module('app')
		.component('tsText', textComponent);
} ())