// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import 'ng-wig/dist/css/ng-wig.css';
import 'ng-wig/dist/ng-wig';
import './editorButtons.css';

import * as angular from 'angular';
import * as _ from 'lodash';

import { services } from 'typescript-angular-utilities';
import __object = services.object;

import { input, InputController, moduleName as inputModule } from '../input/input';
import { IComponentValidatorFactory, factoryName as componentValidatorFactoryName } from '../../services/componentValidator/componentValidator.service';
import { richTextEditorProvider, providerName, IRichTextEditorProvider } from './richTextEditor.config';
import { headerButton, headerButtonDirectiveName, } from './headerButton';
import { paragraphButton, paragraphButtonDirectiveName, } from './paragraphButton';

let externalProviderName: string = providerName + 'Provider';
export { externalProviderName as providerName, IRichTextEditorProvider };

export var moduleName: string = 'rl.ui.components.richTextEditor';
export var componentName: string = 'rlRichTextEditor';
export var controllerName: string = 'RichTextEditorController';

export interface IRichTextEditorBindings {
	customButtons: string[];
	ngDisabled: boolean;
}

export class RichTextEditorController extends InputController {
	// bindings
	customButtons: string;
	ngDisabled: boolean;

	toolbar: string;

	static $inject: string[] = [__object.serviceName, providerName];
	constructor($scope: angular.IScope
			, $attrs: angular.IAttributes
			, componentValidatorFactory: IComponentValidatorFactory
			, object: __object.IObjectUtility
			, provider: void) {
		super($scope, <any>$attrs, componentValidatorFactory);
		this.inputType = 'rich-text-editor';

		this.toolbar = 'h1, paragraph, bold, italic, underline, list1, list2, indent, outdent';

		if (!object.isNullOrEmpty(this.customButtons)) {
			this.toolbar += ', ' + this.customButtons;
		}
	}
}

let richTextEditor: angular.IComponentOptions = _.clone(input);
richTextEditor.template = require('./richTextEditor.html');
richTextEditor.controller = controllerName;
richTextEditor.controllerAs = 'editor';
let richTextEditorBindings: any = richTextEditor.bindings;
richTextEditorBindings.customButtons = '<?';
richTextEditorBindings.ngDisabled = '<?';

angular.module(moduleName, ['ngWig', __object.moduleName])
	.component(componentName, richTextEditor)
	.controller(controllerName, RichTextEditorController)
	.directive(headerButtonDirectiveName, headerButton)
	.directive(paragraphButtonDirectiveName, paragraphButton)
	.provider(providerName, richTextEditorProvider);
