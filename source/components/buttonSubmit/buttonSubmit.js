// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonSubmit';
exports.componentName = 'rlButtonSubmit';
var buttonSubmit = button_1.buildButton({
    template: require('./buttonSubmit.html'),
    bindings: {
        rightAligned: '<?',
        saving: '<?',
        action: null,
    },
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonSubmit);
//# sourceMappingURL=buttonSubmit.js.map