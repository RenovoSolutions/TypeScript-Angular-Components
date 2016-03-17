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
        this.form = options.form;
        this.validator = validationService.buildCustomValidator(function (error, name) {
            _this.error = error;
            _this.errorType = name || 'customValidation';
        });
        _.each(options.validators, function (customValidator) {
            _this.validator.registerValidationHandler(customValidator);
        });
        this.setValidator();
    }
    ComponentValidator.prototype.setValidator = function () {
        var _this = this;
        return this.$scope.$watch(this.validator.validate.bind(this.validator), function (value) {
            if (value) {
                _this.error = null;
            }
            if (!_.isUndefined(_this.ngModel)) {
                _this.ngModel.$setValidity(_this.errorType, value);
                _this.ngModel.rlErrorMessage = _this.error;
            }
            else if (!_.isUndefined(_this.form)) {
                _this.form.$setValidity(_this.errorType, value, 'group');
            }
            else if (_.isFunction(_this.setValidity)) {
                _this.setValidity(value);
            }
        });
    };
    return ComponentValidator;
}());
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