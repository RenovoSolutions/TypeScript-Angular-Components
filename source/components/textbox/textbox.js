// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var input_1 = require('../input/input');
exports.moduleName = 'rl.ui.components.textbox';
exports.componentName = 'rlTextbox';
var textbox = input_1.buildInput({
    template: require('./textbox.html'),
    bindings: {
        maxlength: '<?',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, textbox);
//# sourceMappingURL=textbox.js.map