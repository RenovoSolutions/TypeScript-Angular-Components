// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.textbox';
exports.directiveName = 'rlTextbox';
exports.controllerName = 'TextboxController';
var TextboxController = (function () {
    function TextboxController($element, $scope, componentValidatorFactory) {
        this.ngModel = $element.controller('ngModel');
        if (!_.isUndefined(this.validator)) {
            this.textboxValidator = componentValidatorFactory.getInstance({
                ngModel: this.ngModel,
                $scope: $scope,
                validators: [this.validator],
            });
        }
    }
    Object.defineProperty(TextboxController.prototype, "text", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    TextboxController.$inject = ['$element', '$scope', componentValidator_service_1.factoryName];
    return TextboxController;
})();
exports.TextboxController = TextboxController;
function textbox() {
    return {
        restrict: 'E',
        require: 'ngModel',
        template: require('./textbox.html'),
        controller: exports.controllerName,
        controllerAs: 'textbox',
        scope: {},
        bindToController: {
            validator: '=',
            label: '@',
        },
    };
}
exports.textbox = textbox;
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .directive(exports.directiveName, textbox)
    .controller(exports.controllerName, TextboxController);
//# sourceMappingURL=textbox.js.map