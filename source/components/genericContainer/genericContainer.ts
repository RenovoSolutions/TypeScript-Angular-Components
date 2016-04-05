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

export let moduleName: string = 'rl.ui.components.genericContainer';
export let componentName: string = 'rlGenericContainer';
export let controllerName: string = 'GenericContainerController';

import __object = services.object;

export class GenericContainerController {
	// Attribute bindings:
	selector: any;
	configuredTemplates: { [index: string]: string };
	defaultTemplate: string;

	templateScope: angular.IScope;
	container: angular.IAugmentedJQuery;
	templates: { [index: string]: string };
	default: string;

	static $inject: string[] = ['$scope'
							, '$element'
							, '$transclude'
							, '$compile'
							, __object.serviceName
							, jqueryServiceName
							, templateLoaderService];
	constructor($scope: angular.IScope
			, private $element: angular.IAugmentedJQuery
			, private $transclude: angular.ITranscludeFunction
			, private $compile: angular.ICompileService
			, private object: __object.IObjectUtility
			, private jquery: IJQueryUtility
			, private templateLoader: ITemplateLoader) {
		$scope.$watch((): any => { return this.selector; }, (newType: any, oldType: any): void => {
			if (this.object.areEqual(newType, oldType)) {
				return;
			}

			let template: string = this.resolveTemplate(newType);
			this.swapTemplates(template);
		});
	}

	refresh(): void {
		let template: string = this.resolveTemplate(this.selector);
		this.swapTemplates(template);
	}

	resolveTemplate(type: string): string {
		if (_.has(this.templates, type)) {
			return this.templates[type];
		} else {
			return this.default;
		}
	}

	$postLink(): void {
		this.initDefaults();

		this.container = this.$element.find('#container');
		let templateResult = this.templateLoader.loadTemplates(this.$transclude);

		this.templates = <any>_.extend(this.templates, templateResult.templates);
		this.default = templateResult.default;
		this.templateScope = templateResult.transclusionScope;

		if (!this.default) {
			this.default = '<div></div>';
		}

		this.refresh();
	}

	private initDefaults(): void {
		this.default = this.defaultTemplate;
		this.templates = this.configuredTemplates ? this.configuredTemplates : {};
	}

	private swapTemplates(template: string): void {
		let content: angular.IAugmentedJQuery = angular.element(template);
		this.jquery.replaceContent(this.container, content);
		this.$compile(content)(this.templateScope)
	}
}

let genericContainer: angular.IComponentOptions = {
	template: '<div id="container"></div>',
	transclude: true,
	controller: controllerName,
	controllerAs: 'genericContainer',
	bindings: {
		selector: '<',
		configuredTemplates: '<templates',
		defaultTemplate: '<',
	},
};

angular.module(moduleName, [jqueryModuleName, __object.moduleName, templateLoaderModule])
	.component(componentName, genericContainer)
	.controller(controllerName, GenericContainerController);
