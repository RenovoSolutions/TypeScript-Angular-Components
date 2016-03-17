// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';

import { input, moduleName as inputModule } from '../input/input';

export var moduleName: string = 'rl.ui.components.textarea';
export var componentName: string = 'rlTextarea';

let textarea: angular.IComponentOptions = _.clone(input);
textarea.template = require('./textarea.html');
textarea.bindings.name = '@';
textarea.bindings.rows = '<?';
textarea.bindings.ngDisabled = '<?';
textarea.bindings.maxlength = '<?';

angular.module(moduleName, [inputModule])
	.component(componentName, textarea);
