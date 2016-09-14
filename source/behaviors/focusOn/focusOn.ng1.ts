import * as angular from 'angular';

export const moduleName: string = 'rl.ui.behaviors.focusOn';
export const directiveName: string = 'rlFocusOn';

focusOn.$inject = ['$timeout', '$parse'];
export function focusOn($timeout, $parse): angular.IDirective {
	return {
		link: function(scope, element, attrs: any) {
			var model = $parse(attrs.rlFocusOn);
			scope.$watch(model, function (value) {
				if (value === true) {
					$timeout(function () {
						let thisElement = element[0];
						if (thisElement.tagName.toLowerCase() == 'input') {
							thisElement.focus();
						}
						else {
							let ngElement = angular.element(thisElement);
							ngElement.find('input').focus();
						}
					});
				}
			});
		}
	};
}

angular.module(moduleName, [])
	.directive(directiveName, focusOn);
