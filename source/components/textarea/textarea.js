// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.textarea';
exports.directiveName = 'rlTextarea';
exports.controllerName = 'TextareaController';
var TextareaController = (function () {
    function TextareaController($element, $scope, componentValidatorFactory) {
        this.ngModel = $element.controller('ngModel');
        if (!_.isUndefined(this.validator)) {
            this.textareaValidator = componentValidatorFactory.getInstance({
                ngModel: this.ngModel,
                $scope: $scope,
                validators: [this.validator],
            });
        }
    }
    Object.defineProperty(TextareaController.prototype, "text", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    TextareaController.$inject = ['$element', '$scope', componentValidator_service_1.factoryName];
    return TextareaController;
})();
exports.TextareaController = TextareaController;
function textarea() {
    return {
        restrict: 'E',
        require: 'ngModel',
        template: require('./textarea.html'),
        controller: exports.controllerName,
        controllerAs: 'textarea',
        scope: {},
        bindToController: {
            name: '@',
            rows: '=',
            ngDisabled: '=',
            label: '@',
            validator: '=',
        },
    };
}
exports.textarea = textarea;
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .directive(exports.directiveName, textarea)
    .controller(exports.controllerName, TextareaController);
//# sourceMappingURL=textarea.js.map