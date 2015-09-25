'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import {
	moduleName as jqueryModuleName,
	serviceName as jqueryServiceName,
	IJQueryUtility,
} from '../../services/jquery/jquery.service';

export var moduleName: string = 'rl.ui.components.genericContainer';
export var directiveName: string = 'rlGenericContainer';
export var controllerName: string = 'GenericContainerController';

import __object = services.object;

export interface IGenericTemplate {
	templateUrl?: string;
	template?: string;
}

export class GenericContainerController {
	// Attribute bindings:
	selector: any;
	configuredTemplates: any;
	defaultTemplate: IGenericTemplate | string;

	// Link / controller coupling
	templates: any;
	default: IGenericTemplate | string;
	swapTemplates: {(template: string): void};

	static $inject: string[] = ['$scope', __object.serviceName];
	constructor($scope: angular.IScope,
				private object: __object.IObjectUtility) {
		$scope.$watch((): any => { return this.selector; }, (newType: any, oldType: any): void => {
			if (this.object.areEqual(newType, oldType)) {
				return;
			}

			var template: string = this.resolveTemplate(newType);
			this.swapTemplates(template);
		});
	}

	refresh(): void {
		var template: string = this.resolveTemplate(this.selector);
		this.swapTemplates(template);
	}

	resolveTemplate(type: string): string {
		var templateObject: IGenericTemplate | string;

		if (_.has(this.templates, type)) {
			templateObject = this.templates[type];
		} else {
			templateObject = this.default;
		}

		var template: IGenericTemplate = templateObject;

		if (!_.isUndefined(template.templateUrl)) {
			return '<ng-include src="\'' + template.templateUrl + '\'"></ng-include>';
		} else if (!_.isUndefined(template.template)) {
			return template.template;
		} else {
			return <string> templateObject;
		}
	}
}

genericContainer.$inject = ['$compile', '$interpolate', jqueryServiceName, __object.serviceName];

function genericContainer($compile: angular.ICompileService,
						$interpolate: angular.IInterpolateService,
						jquery: IJQueryUtility,
						object: __object.IObjectUtility): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: '<div id="container"></div>',
		transclude: true,
		controller: controllerName,
		controllerAs: 'genericContainer',
		scope: {},
		bindToController: {
			selector: '=',
			configuredTemplates: '=templates',
			defaultTemplate: '=',
		},
		link: (scope: angular.IScope,
			element: angular.IAugmentedJQuery,
			attributes: angular.IAttributes,
			controller: GenericContainerController,
			transclude: angular.ITranscludeFunction): void => {

			initDefaults(controller);

			var container: angular.IAugmentedJQuery = element.find('#container');
			var templateScope: angular.IScope;

			// Load templates from the DOM
			transclude((clone: angular.IAugmentedJQuery,
						transclusionScope: angular.IScope): void => {
				var templates: JQuery = clone.filter('template');

				templates.each((index: number,
								template: Element): void => {
					var templateElement: angular.IAugmentedJQuery = angular.element(template);
					var templateHtml: string = templateElement.html();

					var triggerAttribute: string = templateElement.attr('when-selector');
					if (!object.isNullOrWhitespace(triggerAttribute)) {
						var trigger: string = $interpolate(triggerAttribute)(transclusionScope);
						controller.templates[trigger] = templateHtml;
					}

					var isDefault: string = templateElement.attr('default');
					if (!_.isUndefined(isDefault) && isDefault.toLowerCase() !== 'false') {
						controller.default = templateHtml;
					}
				});

				templateScope = transclusionScope;
			});

			if (!controller.default) {
				controller.default = {
					template: '<div></div>',
				};
			}

			controller.refresh();

			function initDefaults(controller: GenericContainerController): void {
				controller.default = controller.defaultTemplate;
				controller.templates = controller.configuredTemplates ? controller.configuredTemplates : {};
				controller.swapTemplates = swapTemplates;
			}

			function swapTemplates(template: string): void {
				var content: angular.IAugmentedJQuery = $compile(template)(templateScope);
				jquery.replaceContent(container, content);
			}
		}
	};
}

angular.module(moduleName, [jqueryModuleName, __object.moduleName])
	.directive(directiveName, genericContainer)
	.controller(controllerName, GenericContainerController);
