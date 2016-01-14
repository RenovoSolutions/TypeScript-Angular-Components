// /// <reference path='../../../typings/jquery/jquery.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

export var moduleName: string = 'rl.utilities.services.templateLoader';
export var serviceName: string = 'templateLoader';

export interface TemplateResult {
	templates: { [index: string]: JQuery };
	default: string;
	transclusionScope: angular.IScope;
}

export interface ITemplateLoader {
	loadTemplates(transclude: angular.ITranscludeFunction): TemplateResult;
}

class TemplateLoader implements ITemplateLoader {
	static $inject: string[] = ['$interpolate', 'templateSelectorValue', __object.serviceName];
	constructor(private $interpolate: angular.IInterpolateService,
				private templateSelectorValue,
				private objectUtility: __object.IObjectUtility) { }

	loadTemplates(transclude: angular.ITranscludeFunction): TemplateResult {
		let result: TemplateResult = {
			templates: {},
			default: null,
			transclusionScope: null,
		};

		// Load templates from the DOM
		transclude((clone: angular.IAugmentedJQuery,
					transclusionScope: angular.IScope): void => {
			let templates: JQuery = clone.filter(this.templateSelectorValue);

			templates.each((index: number,
							template: Element): void => {
				let templateElement: angular.IAugmentedJQuery = angular.element(template);
				let templateHtml: string = templateElement.html();

				let triggerAttribute: string = templateElement.attr('when-selector');
				if (!this.objectUtility.isNullOrWhitespace(triggerAttribute)) {
					let trigger: string = this.$interpolate(triggerAttribute)(transclusionScope);
					result.templates[trigger] = templateHtml;
				}

				let isDefault: string = templateElement.attr('default');
				if (!_.isUndefined(isDefault) && isDefault.toLowerCase() !== 'false') {
					result.default = templateHtml;
				}
			});

			result.transclusionScope = transclusionScope;
		});

		return result;
	}
}

angular.module(moduleName, [__object.moduleName])
	.value('templateSelectorValue', 'template')
	.service(serviceName, TemplateLoader);
