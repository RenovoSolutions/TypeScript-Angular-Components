"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
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
componentValidatorFactory.$inject = [typescript_angular_utilities_1.downgrade.validationServiceName];
function componentValidatorFactory(validationService) {
    return {
        getInstance: function (options) {
            return new ComponentValidator(validationService, options);
        },
    };
}
exports.componentValidatorFactory = componentValidatorFactory;
angular.module(exports.moduleName, [typescript_angular_utilities_1.downgrade.moduleName])
    .factory(exports.factoryName, componentValidatorFactory);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50VmFsaWRhdG9yLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb21wb25lbnRWYWxpZGF0b3Iuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQW9DLDhCQUE4QixDQUFDLENBQUE7QUFLeEQsa0JBQVUsR0FBVyxtQ0FBbUMsQ0FBQztBQUN6RCxtQkFBVyxHQUFXLG9CQUFvQixDQUFDO0FBY3REO0lBVUMsNEJBQVksaUJBQWtELEVBQzFELE9BQW1DO1FBWHhDLGlCQTRDQztRQWhDQyxJQUFJLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7UUFDN0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQztRQUV6QixJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLG9CQUFvQixDQUFDLFVBQUMsS0FBYSxFQUFFLElBQVk7WUFDbkYsS0FBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFDbkIsS0FBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksa0JBQWtCLENBQUM7UUFDN0MsQ0FBQyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsVUFBQyxlQUFnRDtZQUMzRSxLQUFJLENBQUMsU0FBUyxDQUFDLHlCQUF5QixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNELENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTyx5Q0FBWSxHQUFwQjtRQUFBLGlCQWdCQztRQWZBLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLFVBQUMsS0FBYztZQUN0RixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEtBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7WUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsS0FBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDakQsS0FBSSxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQztZQUMxQyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxLQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBTyxPQUFPLENBQUMsQ0FBQztnQkFDNUQsS0FBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLEtBQUssQ0FBQztZQUN2QyxDQUFDO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsS0FBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QixDQUFDO1FBQ0YsQ0FBQyxDQUFDLENBQUM7SUFDSixDQUFDO0lBQ0YseUJBQUM7QUFBRCxDQUFDLEFBNUNELElBNENDO0FBNUNZLDBCQUFrQixxQkE0QzlCLENBQUE7QUFNRCx5QkFBeUIsQ0FBQyxPQUFPLEdBQUcsQ0FBQyx3Q0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7QUFDdEUsbUNBQTBDLGlCQUFrRDtJQUMzRixNQUFNLENBQUM7UUFDTixXQUFXLFlBQUMsT0FBbUM7WUFDOUMsTUFBTSxDQUFDLElBQUksa0JBQWtCLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDM0QsQ0FBQztLQUNELENBQUM7QUFDSCxDQUFDO0FBTmUsaUNBQXlCLDRCQU14QyxDQUFBO0FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxrQkFBVSxFQUFFLENBQUMsd0NBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNoRCxPQUFPLENBQUMsbUJBQVcsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIn0=