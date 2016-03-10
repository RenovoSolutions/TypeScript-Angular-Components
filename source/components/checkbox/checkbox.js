// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('./checkbox.css');
var angular = require('angular');
var componentsDefaultTheme_1 = require('../componentsDefaultTheme');
exports.moduleName = 'rl.ui.components.checkbox';
exports.componentName = 'rlCheckbox';
exports.controllerName = 'CheckboxController';
var CheckboxController = (function () {
    function CheckboxController(useDefaultTheme) {
        this.useDefaultTheme = useDefaultTheme;
    }
    Object.defineProperty(CheckboxController.prototype, "checked", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    CheckboxController.prototype.toggle = function () {
        if (this.active && !this.ngDisabled) {
            this.checked = !this.checked;
        }
    };
    CheckboxController.prototype.$onInit = function () {
        this.active = this.active != null ? this.active : true;
    };
    CheckboxController.$inject = [componentsDefaultTheme_1.defaultThemeValueName];
    return CheckboxController;
}());
exports.CheckboxController = CheckboxController;
exports.checkbox = {
    require: { ngModel: 'ngModel' },
    transclude: true,
    template: require('./checkbox.html'),
    controller: exports.controllerName,
    controllerAs: 'checkbox',
    bindings: {
        ngDisabled: '<?',
        active: '<?',
    },
};
angular.module(exports.moduleName, [])
    .component(exports.componentName, exports.checkbox)
    .controller(exports.controllerName, CheckboxController);
//# sourceMappingURL=checkbox.js.map