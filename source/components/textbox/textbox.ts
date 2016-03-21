// /// <reference path='../../../typings/commonjs.d.ts' />

'use strict';

import * as angular from 'angular';
import * as _ from 'lodash';

import { input, moduleName as inputModule } from '../input/input';

export var moduleName: string = 'rl.ui.components.textbox';
export var componentName: string = 'rlTextbox';

let textbox: angular.IComponentOptions = _.clone(input);
textbox.template = require('./textbox.html');
let textboxBindings: any = textbox.bindings;
textboxBindings.maxlength = '<?';

angular.module(moduleName, [inputModule])
	.component(componentName, textbox);
