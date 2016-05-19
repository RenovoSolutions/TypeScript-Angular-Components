"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __array = typescript_angular_utilities_1.services.array;
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
            _this.validators = __array.arrayUtility.arrayify(_this.validator).concat(__array.arrayUtility.arrayify(_this.validators));
            if (!_.isUndefined(_this.validator)) {
                _this.groupValidator = _this.componentValidatorFactory.getInstance({
                    form: _this.$scope.validationGroupForm,
                    $scope: _this.$scope,
                    validators: _this.validators,
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
        validator: '<?',
        validators: '<?',
    },
};
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .component(exports.componentName, validationGroup)
    .controller(exports.controllerName, ValidationGroupController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbkdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1Qiw2Q0FBeUIsOEJBQThCLENBQUMsQ0FBQTtBQUV4RCxJQUFPLE9BQU8sR0FBRyx1Q0FBUSxDQUFDLEtBQUssQ0FBQztBQUdoQywyQ0FLTyw4REFBOEQsQ0FBQyxDQUFBO0FBRTNELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBTWhFO0lBUUMsbUNBQW9CLE1BQTZCLEVBQ3JDLFFBQWlDLEVBQ2pDLHlCQUFxRDtRQUY3QyxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTRCO0lBQUcsQ0FBQztJQUVyRSwyQ0FBTyxHQUFQO1FBQUEsaUJBV0M7UUFWQSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2IsS0FBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lBQ3ZILEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxLQUFJLENBQUMsY0FBYyxHQUFHLEtBQUksQ0FBQyx5QkFBeUIsQ0FBQyxXQUFXLENBQUM7b0JBQ2hFLElBQUksRUFBRSxLQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQjtvQkFDckMsTUFBTSxFQUFFLEtBQUksQ0FBQyxNQUFNO29CQUNuQixVQUFVLEVBQUUsS0FBSSxDQUFDLFVBQVU7aUJBQzNCLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFoQk0saUNBQU8sR0FBYSxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsd0NBQTZCLENBQUMsQ0FBQztJQWlCbEYsZ0NBQUM7QUFBRCxDQUFDLEFBeEJELElBd0JDO0FBeEJZLGlDQUF5Qiw0QkF3QnJDLENBQUE7QUFFRCxJQUFJLGVBQWUsR0FBOEI7SUFDaEQsVUFBVSxFQUFFLElBQUk7SUFDaEIsUUFBUSxFQUFFLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztJQUMzQyxVQUFVLEVBQUUsc0JBQWM7SUFDMUIsWUFBWSxFQUFFLE9BQU87SUFDckIsUUFBUSxFQUFFO1FBQ1QsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsSUFBSTtLQUNoQjtDQUNELENBQUM7QUFFRixPQUFPLENBQUMsTUFBTSxDQUFDLGtCQUFVLEVBQUUsQ0FBQyx1Q0FBNEIsQ0FBQyxDQUFDO0tBQ3hELFNBQVMsQ0FBQyxxQkFBYSxFQUFFLGVBQWUsQ0FBQztLQUN6QyxVQUFVLENBQUMsc0JBQWMsRUFBRSx5QkFBeUIsQ0FBQyxDQUFDIn0=