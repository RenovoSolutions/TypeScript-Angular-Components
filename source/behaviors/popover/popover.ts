'use strict';

import * as angular from 'angular';

import { services } from 'typescript-angular-utilities';
import __guid = services.guid;

export var moduleName: string = 'rl.ui.behaviors.popover';
export var directiveName: string = 'rlPopover';
export var controllerName: string = 'PopoverController';

export interface IPopoverAttributes extends angular.IAttributes {
	rlPopover: string;
	textOnly: string;
}

export class PopoverController {
	static $inject: string[] = ['$attrs'
							, '$element'
							, '$compile'
							, '$scope'
							, '$parse'
							, '$templateCache'
							, __guid.serviceName];
	constructor(private $attrs: IPopoverAttributes
			, private $element: angular.IAugmentedJQuery
			, private $compile: angular.ICompileService
			, private $scope: angular.IScope
			, private $parse: angular.IParseService
			, private $templateCache: angular.ITemplateCacheService
			, private guid: __guid.IGuidService) { }

	$onInit(): void {
		if (this.$parse(this.$attrs.textOnly)(this.$scope)) {
			this.$element.attr('uib-popover', this.$attrs.rlPopover);
		}
		else {
			let templatePath: string = this.guid.random() + '.html';
			let templateContent: string = this.$parse(this.$attrs.rlPopover)(this.$scope);
			this.$templateCache.put(templatePath, templateContent);
			this.$element.attr('uib-popover-template', '\'' + templatePath + '\'');
		}

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
