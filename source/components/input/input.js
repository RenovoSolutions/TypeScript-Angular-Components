// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __guid = typescript_angular_utilities_1.services.guid;
var required_1 = require('../../behaviors/required/required');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.input';
exports.controllerName = 'InputController';
var InputController = (function () {
    function InputController($scope, $attrs, componentValidatorFactory) {
        this.$scope = $scope;
        this.$attrs = $attrs;
        this.componentValidatorFactory = componentValidatorFactory;
        this.inputType = 'input';
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
        if (__object.objectUtility.isNullOrEmpty(this.$attrs.name)) {
            this.$attrs.$set('name', this.inputType + '-' + __guid.guid.random());
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
    InputController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName];
    return InputController;
}());
exports.InputController = InputController;
var baseInputOptions = {
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
        name: '@',
    },
};
function buildInput(options) {
    var clone = _.clone(baseInputOptions);
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    return clone;
}
exports.buildInput = buildInput;
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .controller(exports.controllerName, InputController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDO0FBRWIsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFHOUIseUJBQTJFLG1DQUFtQyxDQUFDLENBQUE7QUFDL0csMkNBS08sOERBQThELENBQUMsQ0FBQTtBQUUzRCxrQkFBVSxHQUFXLHdCQUF3QixDQUFDO0FBQzlDLHNCQUFjLEdBQVcsaUJBQWlCLENBQUM7QUFhdEQ7SUFvQkMseUJBQXNCLE1BQXNCLEVBQzlCLE1BQXdCLEVBQzFCLHlCQUFxRDtRQUYzQyxXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUM5QixXQUFNLEdBQU4sTUFBTSxDQUFrQjtRQUMxQiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTRCO1FBYmpFLGNBQVMsR0FBVyxPQUFPLENBQUM7SUFheUMsQ0FBQztJQVh0RSxzQkFBSSx1Q0FBVTthQUFkO1lBQ0MsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBQ2hDLENBQUM7YUFFRCxVQUFlLEtBQWE7WUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQzs7O09BSkE7SUFXRCxpQ0FBTyxHQUFQO1FBQUEsaUJBMEJDO1FBekJBLElBQUksVUFBVSxHQUFzQyxFQUFFLENBQUM7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7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