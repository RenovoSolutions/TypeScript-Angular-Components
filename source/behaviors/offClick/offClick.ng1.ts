import * as angular from 'angular';

export const moduleName: string = 'rl.ui.behaviors.offClick';
export const directiveName: string = 'rlOffClick';
export const controllerName: string = 'rlOffClickController';

export interface IOffClickAttributes extends angular.IAttributes {
	rlOffClick: string;
}

export class OffClickController {
	event: { (event: MouseEvent): void };
	listener: { ($event: MouseEvent): void } = ($event) => this.event($event);

	static $inject: string[] = ['$element', '$timeout', '$attrs', '$scope', '$parse'];
	constructor(private $element: angular.IAugmentedJQuery
			, private $timeout: angular.ITimeoutService
			, $attrs: IOffClickAttributes
			, $scope: angular.IScope
			, $parse: angular.IParseService) {
		this.event = $parse($attrs.rlOffClick)($scope);
		this.$element.on('click', ($event: JQueryEventObject): void => {
			$event.stopPropagation();
		});
	}

	$onInit(): void {
		this.$timeout(() => {
			document.addEventListener('click', this.listener);
		})
	}

	$onDestroy(): void {
		document.removeEventListener('click', this.listener);
	}
}

export function offClick(): angular.IDirective {
	return {
		restrict: 'A',
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, offClick)
	.controller(controllerName, OffClickController);
