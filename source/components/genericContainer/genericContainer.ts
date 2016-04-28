'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services, downgrade } from 'typescript-angular-utilities';
import __object = services.object;

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

import { IChangeObject } from '../../types/changes';

export let moduleName: string = 'rl.ui.components.genericContainer';
export let componentName: string = 'rlGenericContainer';
export let controllerName: string = 'GenericContainerController';


export interface IGenericContainerChanges {
	selector: IChangeObject<any>;
}

export class GenericContainerController {
	// bindings:
	selector: any;
	configuredTemplates: { [index: string]: string };
	defaultTemplate: string;

	templateScope: angular.IScope;
	container: angular.IAugmentedJQuery;
	templates: { [index: string]: string };
	default: string;

	static $inject: string[] = ['$element'
		, '$transclude'
		, '$compile'
		, downgrade.objectServiceName
		, jqueryServiceName
		, templateLoaderService];
	constructor(private $element: angular.IAugmentedJQuery
		, private $transclude: angular.ITranscludeFunction
		, private $compile: angular.ICompileService
		, private object: __object.IObjectUtility
		, private jquery: IJQueryUtility
		, private templateLoader: ITemplateLoader) { }

	$onChanges(changes: IGenericContainerChanges): void {
		if (this.container && changes.selector) {
			let template: string = this.resolveTemplate(changes.selector.currentValue);
			this.swapTemplates(template);
		}
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

angular.module(moduleName, [jqueryModuleName, downgrade.moduleName, templateLoaderModule])
	.component(componentName, genericContainer)
	.controller(controllerName, GenericContainerController);
