// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.buttonLink';
exports.componentName = 'rlButtonLink';
exports.controllerName = 'ButtonLinkController';
var ButtonLinkController = (function () {
    function ButtonLinkController() {
        this.type = this.type != null ? this.type : 'default';
        this.configuredSize = this.size != null ? 'btn-' + this.size : null;
        this.target = this.newTab ? '_blank' : '_self';
    }
    return ButtonLinkController;
}());
exports.ButtonLinkController = ButtonLinkController;
var buttonLink = {
    transclude: true,
    template: require('./buttonLink.html'),
    bindings: {
        link: '@',
        type: '@',
        ngDisabled: '<?',
        size: '@',
        newTab: '<?',
    },
    controller: exports.controllerName,
    controllerAs: 'button',
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonLink)
    .controller(exports.controllerName, ButtonLinkController);
//# sourceMappingURL=buttonLink.js.map