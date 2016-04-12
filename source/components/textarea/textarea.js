// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textarea';
exports.componentName = 'rlTextarea';
var textarea = input_1.buildInput({
    template: require('./textarea.html'),
    bindings: {
        rows: '<?',
        ngDisabled: '<?',
        maxlength: '<?',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textarea);
//# sourceMappingURL=textarea.js.map