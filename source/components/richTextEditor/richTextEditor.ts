// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import '../../../libraries/ngWig/css/ng-wig.css';
import '../../../libraries/ngWig/ng-wig';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { configureNgWig } from './ngWig.config';
import { headerButton, HeaderButtonController, headerButtonDirectiveName, headerButtonControllerName } from './headerButton';

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

	static $inject: string[] = [__object.serviceName];
	constructor(object: __object.IObjectUtility) {
		this.toolbar = 'h1, bold, italic, underline, list1, list2, indent, outdent';

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
	.controller(headerButtonControllerName, HeaderButtonController)
	.config(configureNgWig);
