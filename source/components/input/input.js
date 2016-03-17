// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var required_1 = require('../../behaviors/required/required');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.input';
exports.controllerName = 'InputController';
var InputController = (function () {
    function InputController($scope, componentValidatorFactory) {
        this.$scope = $scope;
        this.componentValidatorFactory = componentValidatorFactory;
    }
    Object.defineProperty(InputController.prototype, "inputValue", {
        get: function () {
            return this.ngModel.$viewValue;
        },
        set: function (value) {
            this.ngModel.$setViewValue(value);
        },
        enumerable: true,
        configurable: true
    });
    InputController.prototype.$onInit = function () {
        var _this = this;
        var validators = [];
        if (!_.isUndefined(this.validator)) {
            validators.push(this.validator);
        }
        if (this.required != null) {
            validators.push({
                name: 'rlRequired',
                validate: function () { return !__object.objectUtility.isNullOrEmpty(_this.ngModel.$viewValue); },
                errorMessage: this.required.message,
            });
        }
        if (_.some(validators)) {
            this.inputValidator = this.componentValidatorFactory.getInstance({
                ngModel: this.ngModel,
                $scope: this.$scope,
                validators: validators,
            });
        }
    };
    InputController.$inject = ['$scope', componentValidator_service_1.factoryName];
    return InputController;
}());
exports.InputController = InputController;
exports.input = {
    require: {
        ngModel: 'ngModel',
        required: '?' + required_1.directiveName,
    },
    template: '',
    controller: exports.controllerName,
    controllerAs: 'input',
    bindings: {
        validator: '<?',
        label: '@',
    },
};
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .controller(exports.controllerName, InputController);
//# sourceMappingURL=input.js.map