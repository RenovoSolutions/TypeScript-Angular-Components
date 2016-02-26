// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.validationGroup';
exports.directiveName = 'rlValidationGroup';
exports.controllerName = 'ValidationGroupController';
var ValidationGroupController = (function () {
    function ValidationGroupController($scope, componentValidatorFactory) {
        var _this = this;
        var unbind = $scope.$watch('validationGroupForm', function (form) {
            if (!_.isUndefined(_this.validator)) {
                _this.groupValidator = componentValidatorFactory.getInstance({
                    form: $scope.validationGroupForm,
                    $scope: $scope,
                    validators: [_this.validator],
                });
            }
            unbind();
        });
    }
    ValidationGroupController.$inject = ['$scope', componentValidator_service_1.factoryName];
    return ValidationGroupController;
}());
exports.ValidationGroupController = ValidationGroupController;
function validationGroup() {
    return {
        restrict: 'E',
        transclude: true,
        template: require('./validationGroup.html'),
        controller: exports.controllerName,
        controllerAs: 'group',
        scope: {},
        bindToController: {
            validator: '=',
        },
    };
}
exports.validationGroup = validationGroup;
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .directive(exports.directiveName, validationGroup)
    .controller(exports.controllerName, ValidationGroupController);
//# sourceMappingURL=validationGroup.js.map