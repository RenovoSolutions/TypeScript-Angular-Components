'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';

import {
	moduleName as jqueryModuleName,
	serviceName as jqueryServiceName,
	IJQueryUtility,
} from '../../services/jquery/jquery.service';

import {
	ITemplateLoader,
	serviceName as templateLoaderService,
	moduleName as templateLoaderModule,
} from '../../services/templateLoader/templateLoader.service';

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
	configuredTemplates: { [index: string]: string };
	defaultTemplate: JQuery;

	// Link / controller coupling
	templates: { [index: string]: JQuery };
	default: JQuery;
	swapTemplates: {(template: JQuery): void};

	static $inject: string[] = ['$scope', __object.serviceName];
	constructor($scope: angular.IScope,
				private object: __object.IObjectUtility) {
		$scope.$watch((): any => { return this.selector; }, (newType: any, oldType: any): void => {
			if (this.object.areEqual(newType, oldType)) {
				return;
			}

			var template: JQuery = this.resolveTemplate(newType);
			this.swapTemplates(template);
		});
	}

	refresh(): void {
		var template: JQuery = this.resolveTemplate(this.selector);
		this.swapTemplates(template);
	}

	resolveTemplate(type: string): JQuery {
		if (_.has(this.templates, type)) {
			return this.templates[type];
		} else {
			return this.default;
		}
	}
}

genericContainer.$inject = [
	'$compile',
	'$interpolate',
	jqueryServiceName,
	templateLoaderService,
	__object.serviceName,
];
function genericContainer($compile: angular.ICompileService,
						$interpolate: angular.IInterpolateService,
						jquery: IJQueryUtility,
						templateLoader: ITemplateLoader,
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

			let container: angular.IAugmentedJQuery = element.find('#container');
			let templateResult = templateLoader.loadTemplates(transclude);

			controller.templates = <any>_.extend(controller.templates, templateResult.templates);
			controller.default = templateResult.default;
			let templateScope = templateResult.transclusionScope;

			if (!controller.default) {
				controller.default = angular.element('<div></div>');
			}

			controller.refresh();

			function initDefaults(controller: GenericContainerController): void {
				controller.default = controller.defaultTemplate;
				controller.templates = controller.configuredTemplates
					? <any>_.map(controller.configuredTemplates, (template: string): JQuery => { return angular.element(template); })
					: {};
				controller.swapTemplates = swapTemplates;
			}

			function swapTemplates(template: JQuery): void {
				jquery.replaceContent(container, template);
				let content: angular.IAugmentedJQuery = $compile(template)(templateScope);
			}
		}
	};
}

angular.module(moduleName, [jqueryModuleName, __object.moduleName, templateLoaderModule])
	.directive(directiveName, genericContainer)
	.controller(controllerName, GenericContainerController);
