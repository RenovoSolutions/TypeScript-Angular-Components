'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var angular = require('angular');
var button_1 = require('../button/button');
exports.moduleName = 'rl.ui.components.buttonToggle';
exports.componentName = 'rlButtonToggle';
exports.controllerName = 'ButtonToggleController';
var ButtonToggleController = (function (_super) {
    __extends(ButtonToggleController, _super);
    function ButtonToggleController() {
        _super.call(this);
    }
    Object.defineProperty(ButtonToggleController.prototype, "checked", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    ButtonToggleController.prototype.clicked = function () {
        if (!this.ngDisabled) {
            this.checked = !this.checked;
            this.onToggle({ value: this.checked });
        }
    };
    return ButtonToggleController;
}(button_1.ButtonController));
exports.ButtonToggleController = ButtonToggleController;
var buttonToggle = button_1.buildButton({
    require: { ngModel: '^ngModel' },
    template: require('./buttonToggle.html'),
    controller: exports.controllerName,
    controllerAs: 'buttonToggle',
    bindings: {
        onToggle: '&',
        action: null,
    },
});
angular.module(exports.moduleName, [])
    .component(exports.componentName, buttonToggle)
    .controller(exports.controllerName, ButtonToggleController);
//# sourceMappingURL=buttonToggle.js.map