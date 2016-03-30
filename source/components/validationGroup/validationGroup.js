// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.validationGroup';
exports.componentName = 'rlValidationGroup';
exports.controllerName = 'ValidationGroupController';
var ValidationGroupController = (function () {
    function ValidationGroupController($scope, $timeout, componentValidatorFactory) {
        this.$scope = $scope;
        this.$timeout = $timeout;
        this.componentValidatorFactory = componentValidatorFactory;
    }
    ValidationGroupController.prototype.$onInit = function () {
        var _this = this;
        this.$timeout(function () {
            if (!_.isUndefined(_this.validator)) {
                _this.groupValidator = _this.componentValidatorFactory.getInstance({
                    form: _this.$scope.validationGroupForm,
                    $scope: _this.$scope,
                    validators: [_this.validator],
                });
            }
        });
    };
    ValidationGroupController.$inject = ['$scope', '$timeout', componentValidator_service_1.factoryName];
    return ValidationGroupController;
}());
exports.ValidationGroupController = ValidationGroupController;
var validationGroup = {
    transclude: true,
    template: require('./validationGroup.html'),
    controller: exports.controllerName,
    controllerAs: 'group',
    bindings: {
        validator: '=',
    },
};
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .component(exports.componentName, validationGroup)
    .controller(exports.controllerName, ValidationGroupController);
//# sourceMappingURL=validationGroup.js.map