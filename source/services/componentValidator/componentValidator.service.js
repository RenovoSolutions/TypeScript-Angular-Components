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
                _this.form.rlErrorMessage = _this.error;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50VmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wb25lbnRWYWxpZGF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUN4RCxJQUFPLFlBQVksR0FBRyx1Q0FBUSxDQUFDLFVBQVUsQ0FBQztBQUkvQixrQkFBVSxHQUFXLG1DQUFtQyxDQUFDO0FBQ3pELG1CQUFXLEdBQVcsb0JBQW9CLENBQUM7QUFjdEQ7SUFVQyw0QkFBWSxpQkFBa0QsRUFDMUQsT0FBbUM7UUFYeEMsaUJBNENDO1FBaENDLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUM3QixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBRXpCLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsb0JBQW9CLENBQUMsVUFBQyxLQUFhLEVBQUUsSUFBWTtZQUNuRixLQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixLQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxrQkFBa0IsQ0FBQztRQUM3QyxDQUFDLENBQUMsQ0FBQztRQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxVQUFDLGVBQWdEO1lBQzNFLEtBQUksQ0FBQyxTQUFTLENBQUMseUJBQXlCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDckIsQ0FBQztJQUVPLHlDQUFZLEdBQXBCO1FBQUEsaUJBZ0JDO1FBZkEsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsVUFBQyxLQUFjO1lBQ3RGLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ1gsS0FBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbkIsQ0FBQztZQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsQyxLQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUNqRCxLQUFJLENBQUMsT0FBTyxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQzFDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3RDLEtBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxFQUFPLE9BQU8sQ0FBQyxDQUFDO2dCQUM1RCxLQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLENBQUM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxLQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pCLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFDRix5QkFBQztBQUFELENBQUMsQUE1Q0QsSUE0Q0M7QUE1Q1ksMEJBQWtCLHFCQTRDOUIsQ0FBQTtBQU1ELHlCQUF5QixDQUFDLE9BQU8sR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUMvRCxtQ0FBMEMsaUJBQWtEO0lBQzNGLE1BQU0sQ0FBQztRQUNOLFdBQVcsWUFBQyxPQUFtQztZQUM5QyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQ0QsQ0FBQztBQUNILENBQUM7QUFOZSxpQ0FBeUIsNEJBTXhDLENBQUE7QUFFRCxPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDbkQsT0FBTyxDQUFDLG1CQUFXLEVBQUUseUJBQXlCLENBQUMsQ0FBQyJ9