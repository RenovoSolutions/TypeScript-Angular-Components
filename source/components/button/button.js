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
function buildButton(options) {
    var clone = _.clone(button);
    clone.require = options.require;
    clone.transclude = options.transclude != null ? options.transclude : clone.transclude;
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    _.each(clone.bindings, function (binding, key) {
        if (binding == null) {
            delete clone.bindings[key];
        }
    });
    return clone;
}
exports.buildButton = buildButton;
angular.module(exports.moduleName, [])
    .component(exports.componentName, button)
    .controller(exports.controllerName, ButtonController);
//# sourceMappingURL=button.js.map