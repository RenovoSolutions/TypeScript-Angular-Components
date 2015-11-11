'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __validation = typescript_angular_utilities_1.services.validation;
exports.moduleName = 'rl.ui.services.componentValidator';
exports.factoryName = 'componentValidator';
var ComponentValidator = (function () {
    function ComponentValidator(validationService, options) {
        var _this = this;
        this.$scope = options.$scope;
        this.ngModel = options.ngModel;
        this.validator = validationService.buildCustomValidator(function (error) {
            _this.error = error;
        });
        _.each(options.validators, function (customValidator) {
            _this.validator.registerValidationHandler(customValidator);
        });
        var unregisterValidator;
        this.$scope.$watch(function () { return _this.ngModel.$dirty; }, function (value) {
            if (value) {
                unregisterValidator = _this.setValidator();
            }
            else {
                if (_.isFunction(unregisterValidator)) {
                    unregisterValidator();
                }
            }
        });
    }
    ComponentValidator.prototype.setValidator = function () {
        var _this = this;
        return this.$scope.$watch(this.validator.validate.bind(this.validator), function (value) {
            _this.ngModel.$setValidity('customValidation', value);
            if (value) {
                _this.error = null;
            }
        });
    };
    return ComponentValidator;
})();
exports.ComponentValidator = ComponentValidator;
componentValidatorFactory.$inject = [__validation.serviceName];
function componentValidatorFactory(validationService) {
    return {
        getInstance: function (options) {
            return new ComponentValidator(validationService, options);
        },
    };
}
exports.componentValidatorFactory = componentValidatorFactory;
angular.module(exports.moduleName, [__validation.moduleName])
    .factory(exports.factoryName, componentValidatorFactory);
//# sourceMappingURL=componentValidator.service.js.map