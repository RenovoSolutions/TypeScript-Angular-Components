// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonLink';
exports.componentName = 'rlButtonLink';
exports.controllerName = 'ButtonLinkController';
var ButtonLinkController = (function (_super) {
    __extends(ButtonLinkController, _super);
    function ButtonLinkController() {
        _super.call(this);
        this.target = this.newTab ? '_blank' : '_self';
    }
    return ButtonLinkController;
}(button_1.ButtonController));
exports.ButtonLinkController = ButtonLinkController;
var buttonLink = button_1.buildButton({
    template: require('./buttonLink.html'),
    bindings: {
        link: '@',
        newTab: '<?',
        action: null,
    },
    controller: exports.controllerName,
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonLink)
    .controller(exports.controllerName, ButtonLinkController);
//# sourceMappingURL=buttonLink.js.map