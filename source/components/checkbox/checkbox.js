// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
exports.moduleName = 'rl.ui.components.checkbox';
exports.directiveName = 'rlCheckbox';
exports.controllerName = 'CheckboxController';
var CheckboxController = (function () {
    function CheckboxController($element) {
        this.ngModel = $element.controller('ngModel');
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
    CheckboxController.$inject = ['$element'];
    return CheckboxController;
}());
exports.CheckboxController = CheckboxController;
function checkbox() {
    return {
        restrict: 'E',
        require: 'ngModel',
        transclude: true,
        template: require('./checkbox.html'),
        controller: exports.controllerName,
        controllerAs: 'checkbox',
        scope: {},
        bindToController: {
            ngDisabled: '=',
        },
    };
}
exports.checkbox = checkbox;
angular.module(exports.moduleName, [])
    .directive(exports.directiveName, checkbox)
    .controller(exports.controllerName, CheckboxController);
//# sourceMappingURL=checkbox.js.map