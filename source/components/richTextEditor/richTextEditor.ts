// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import '../../../libraries/ngWig/css/ng-wig.css';
import '../../../libraries/ngWig/ng-wig';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { richTextEditorProvider, providerName, IRichTextEditorProvider } from './richTextEditor.config';
import { headerButton, headerButtonDirectiveName, } from './headerButton';
import { paragraphButton, paragraphButtonDirectiveName, } from './paragraphButton';

let externalProviderName: string = providerName + 'Provider';
export { externalProviderName as providerName, IRichTextEditorProvider };

export var moduleName: string = 'rl.ui.components.richTextEditor';
export var directiveName: string = 'rlRichTextEditor';
export var controllerName: string = 'RichTextEditorController';

export interface IRichTextEditorBindings {
	ngModel: string;
	customButtons: string[];
}

export class RichTextEditorController {
	// bindings
	ngModel: string;
	customButtons: string;

	toolbar: string;

	static $inject: string[] = [__object.serviceName, providerName];
	constructor(object: __object.IObjectUtility, provider: void) {
		this.toolbar = 'paragraph, h1, bold, italic, underline, list1, list2, indent, outdent';

		if (!object.isNullOrEmpty(this.customButtons)) {
			this.toolbar += ', ' + this.customButtons;
		}
	}
}

export function richTextEditor(): angular.IDirective {
	'use strict';
	return {
		restrict: 'E',
		template: require('./richTextEditor.html'),
		controller: controllerName,
		controllerAs: 'editor',
		scope: {},
		bindToController: {
			ngModel: '=',
			customButtons: '=',
		},
	};
}

angular.module(moduleName, ['ngWig', __object.moduleName])
	.directive(directiveName, richTextEditor)
	.controller(controllerName, RichTextEditorController)
	.directive(headerButtonDirectiveName, headerButton)
	.directive(paragraphButtonDirectiveName, paragraphButton)
	.provider(providerName, richTextEditorProvider);
