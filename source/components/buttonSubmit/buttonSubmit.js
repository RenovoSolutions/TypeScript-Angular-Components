// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.buttonSubmit';
exports.componentName = 'rlButtonSubmit';
exports.controllerName = 'ButtonSubmitController';
var ButtonSubmitController = (function () {
    function ButtonSubmitController($element) {
        this.$element = $element;
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null ? 'btn-' + this.size : null;
    }
    ButtonSubmitController.prototype.save = function () {
        this.$element.trigger('submit');
    };
    ButtonSubmitController.$inject = ['$element'];
    return ButtonSubmitController;
}());
exports.ButtonSubmitController = ButtonSubmitController;
var buttonSubmit = {
    transclude: true,
    template: require('./buttonSubmit.html'),
    bindings: {
        type: '@',
        ngDisabled: '<?',
        size: '@',
        rightAligned: '<?',
        saving: '<?',
    },
    controller: exports.controllerName,
    controllerAs: 'button',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonSubmit)
    .controller(exports.controllerName, ButtonSubmitController);
//# sourceMappingURL=buttonSubmit.js.map