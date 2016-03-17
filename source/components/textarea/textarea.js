// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textarea';
exports.componentName = 'rlTextarea';
var textarea = _.clone(input_1.input);
textarea.template = require('./textarea.html');
textarea.bindings.name = '@';
textarea.bindings.rows = '<?';
textarea.bindings.ngDisabled = '<?';
textarea.bindings.maxlength = '<?';
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textarea);
//# sourceMappingURL=textarea.js.map