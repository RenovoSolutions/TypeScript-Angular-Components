// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textbox';
exports.componentName = 'rlTextbox';
var textbox = _.clone(input_1.input);
textbox.template = require('./textbox.html');
textbox.bindings.maxlength = '<?';
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textbox);
//# sourceMappingURL=textbox.js.map