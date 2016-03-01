'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';

export var moduleName: string = 'rl.ui.behaviors.popover';
export var directiveName: string = 'rlPopover';
export var controllerName: string = 'PopoverController';

export interface IPopoverAttributes extends angular.IAttributes {
	rlPopover: string;
}

export class PopoverController {
	static $inject: string[] = ['$attrs', '$element', '$compile', '$scope'];
	constructor(private $attrs: IPopoverAttributes
			, private $element: angular.IAugmentedJQuery
			, private $compile: angular.ICompileService
			, private $scope: angular.IScope) { }

	$onInit(): void {
		this.$element.attr('uib-popover', this.$attrs.rlPopover);
		this.$element.removeAttr('rl-popover');
		this.$compile(this.$element)(this.$scope);
	}
}

export function popover(): angular.IDirective {
	'use strict';
	return {
		restrict: 'A',
		priority: 300,
		controller: controllerName,
	};
}

angular.module(moduleName, [])
	.directive(directiveName, popover)
	.controller(controllerName, PopoverController);
