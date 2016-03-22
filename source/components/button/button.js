// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.button';
exports.directiveName = 'rlButton';
exports.controllerName = 'ButtonController';
var ButtonController = (function () {
    function ButtonController() {
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null ? 'btn-' + this.size : null;
    }
    return ButtonController;
}());
exports.ButtonController = ButtonController;
function button() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./button.html'),
        scope: {},
        bindToController: {
            action: '&',
            type: '@',
            ngDisabled: '<?',
            size: '@',
        },
        controller: exports.controllerName,
        controllerAs: 'button',
    };
}
exports.button = button;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, button)
    .controller(exports.controllerName, ButtonController);
//# sourceMappingURL=button.js.map