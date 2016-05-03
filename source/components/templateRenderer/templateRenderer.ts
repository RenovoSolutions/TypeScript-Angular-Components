// /// <reference path='../../../typings/node/node.d.ts' />

'use strict';

import * as angular from 'angular';

export let moduleName: string = 'rl.ui.components.templateRenderer';
export let componentName: string = 'rlTemplateRenderer';
export let controllerName: string = 'TemplateRendererController';

export interface ITemplateObject {
	template: string;
	scope: angular.IScope;
}

export interface ITemplateRendererBindings {
	template: ITemplateObject;
}

export class TemplateRendererController implements ITemplateRendererBindings {
	template: ITemplateObject;

	static $inject = ['$compile', '$element', '$scope'];
	constructor($compile: angular.ICompileService, $element: angular.IAugmentedJQuery, $scope: angular.IScope) {
		if (_.isString(this.template)) {
			const templateString: string = <any>this.template;
			this.template = {
				template: templateString,
				scope: $scope.$parent.$new(),
			};
		}

		let target: JQuery = $element.find('.template-target');
		let template: JQuery = target.append(this.template.template);
		$compile(template)(this.template.scope);
	}
}

let templateRenderer: angular.IComponentOptions = {
	template: '<div class="template-target"></div>',
	controller: controllerName,
	controllerAs: 'controller',
	bindings: {
		template: '<',
	},
};

angular.module(moduleName, [])
	.component(componentName, templateRenderer)
	.controller(controllerName, TemplateRendererController);
