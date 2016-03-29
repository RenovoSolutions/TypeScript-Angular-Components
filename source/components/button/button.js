// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.button';
exports.componentName = 'rlButton';
exports.controllerName = 'ButtonController';
var ButtonController = (function () {
    function ButtonController() {
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null ? 'btn-' + this.size : null;
    }
    return ButtonController;
}());
exports.ButtonController = ButtonController;
var button = {
    transclude: true,
    template: require('./button.html'),
    bindings: {
        action: '&',
        type: '@',
        ngDisabled: '<?',
        size: '@',
    },
    controller: exports.controllerName,
    controllerAs: 'button',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, button)
    .controller(exports.controllerName, ButtonController);
//# sourceMappingURL=button.js.map