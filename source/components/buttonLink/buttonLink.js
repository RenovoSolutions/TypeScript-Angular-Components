// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.buttonLink';
exports.directiveName = 'rlButtonLink';
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
function buttonLink() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./buttonLink.html'),
        scope: {},
        bindToController: {
            link: '@',
            type: '@',
            ngDisabled: '<?',
            size: '@',
            newTab: '<?',
        },
        controller: exports.controllerName,
        controllerAs: 'button',
    };
}
exports.buttonLink = buttonLink;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, buttonLink)
    .controller(exports.controllerName, ButtonLinkController);
//# sourceMappingURL=buttonLink.js.map