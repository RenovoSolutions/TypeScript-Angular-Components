// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { input, moduleName as inputModule } from '../input/input';

export var moduleName: string = 'rl.ui.components.textarea';
export var componentName: string = 'rlTextarea';

let textarea: angular.IComponentOptions = _.clone(input);
textarea.template = require('./textarea.html');
let textareaBindings: any = textarea.bindings;
textareaBindings.rows = '<?';
textareaBindings.ngDisabled = '<?';
textareaBindings.maxlength = '<?';

angular.module(moduleName, [inputModule])
	.component(componentName, textarea);
