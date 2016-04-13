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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbkdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmFsaWRhdGlvbkdyb3VwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDBEQUEwRDtBQUUxRCxZQUFZLENBQUM7QUFFYixJQUFZLE9BQU8sV0FBTSxTQUFTLENBQUMsQ0FBQTtBQUNuQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQU01QiwyQ0FLTyw4REFBOEQsQ0FBQyxDQUFBO0FBRTNELGtCQUFVLEdBQVcsa0NBQWtDLENBQUM7QUFDeEQscUJBQWEsR0FBVyxtQkFBbUIsQ0FBQztBQUM1QyxzQkFBYyxHQUFXLDJCQUEyQixDQUFDO0FBTWhFO0lBT0MsbUNBQW9CLE1BQTZCLEVBQ3JDLFFBQWlDLEVBQ2pDLHlCQUFxRDtRQUY3QyxXQUFNLEdBQU4sTUFBTSxDQUF1QjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyw4QkFBeUIsR0FBekIseUJBQXlCLENBQTRCO0lBQUcsQ0FBQztJQUVyRSwyQ0FBTyxHQUFQO1FBQUEsaUJBVUM7UUFUQSxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLEtBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSSxDQUFDLHlCQUF5QixDQUFDLFdBQVcsQ0FBQztvQkFDaEUsSUFBSSxFQUFFLEtBQUksQ0FBQyxNQUFNLENBQUMsbUJBQW1CO29CQUNyQyxNQUFNLEVBQUUsS0FBSSxDQUFDLE1BQU07b0JBQ25CLFVBQVUsRUFBRSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUM7aUJBQzVCLENBQUMsQ0FBQztZQUNKLENBQUM7UUFDRixDQUFDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFmTSxpQ0FBTyxHQUFhLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSx3Q0FBNkIsQ0FBQyxDQUFDO0lBZ0JsRixnQ0FBQztBQUFELENBQUMsQUF0QkQsSUFzQkM7QUF0QlksaUNBQXlCLDRCQXNCckMsQ0FBQTtBQUVELElBQUksZUFBZSxHQUE4QjtJQUNoRCxVQUFVLEVBQUUsSUFBSTtJQUNoQixRQUFRLEVBQUUsT0FBTyxDQUFDLHdCQUF3QixDQUFDO0lBQzNDLFVBQVUsRUFBRSxzQkFBYztJQUMxQixZQUFZLEVBQUUsT0FBTztJQUNyQixRQUFRLEVBQUU7UUFDVCxTQUFTLEVBQUUsR0FBRztLQUNkO0NBQ0QsQ0FBQztBQUVGLE9BQU8sQ0FBQyxNQUFNLENBQUMsa0JBQVUsRUFBRSxDQUFDLHVDQUE0QixDQUFDLENBQUM7S0FDeEQsU0FBUyxDQUFDLHFCQUFhLEVBQUUsZUFBZSxDQUFDO0tBQ3pDLFVBQVUsQ0FBQyxzQkFBYyxFQUFFLHlCQUF5QixDQUFDLENBQUMifQ==