"use strict";
var angular = require('angular');
var _ = require('lodash');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __object = typescript_angular_utilities_1.services.object;
var __guid = typescript_angular_utilities_1.services.guid;
var __array = typescript_angular_utilities_1.services.array;
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
            validators = validators.concat(__array.arrayUtility.arrayify(this.validator));
        }
        if (!_.isUndefined(this.validators)) {
            validators = validators.concat(__array.arrayUtility.arrayify(this.validators));
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
        validators: '<?',
        label: '@',
        name: '@',
    },
};
function buildInput(options) {
    var clone = _.clone(baseInputOptions);
    clone.transclude = options.transclude;
    clone.template = options.template;
    clone.controller = options.controller || clone.controller;
    clone.controllerAs = options.controllerAs || clone.controllerAs;
    clone.bindings = _.assign({}, clone.bindings, options.bindings);
    return clone;
}
exports.buildInput = buildInput;
angular.module(exports.moduleName, [componentValidator_service_1.moduleName])
    .controller(exports.controllerName, InputController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFDbkMsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFFNUIsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxNQUFNLEdBQUcsdUNBQVEsQ0FBQyxJQUFJLENBQUM7QUFDOUIsSUFBTyxPQUFPLEdBQUcsdUNBQVEsQ0FBQyxLQUFLLENBQUM7QUFHaEMseUJBQTJFLG1DQUFtQyxDQUFDLENBQUE7QUFDL0csMkNBS08sOERBQThELENBQUMsQ0FBQTtBQUUzRCxrQkFBVSxHQUFXLHdCQUF3QixDQUFDO0FBQzlDLHNCQUFjLEdBQVcsaUJBQWlCLENBQUM7QUFxQnREO0lBcUJDLHlCQUFzQixNQUFzQixFQUM5QixNQUF3QixFQUMxQix5QkFBcUQ7UUFGM0MsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFDOUIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDMUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUE0QjtRQWJqRSxjQUFTLEdBQVcsT0FBTyxDQUFDO0lBYXlDLENBQUM7SUFYdEUsc0JBQUksdUNBQVU7YUFBZDtZQUNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztRQUNoQyxDQUFDO2FBRUQsVUFBZSxLQUFhO1lBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ25DLENBQUM7OztPQUpBO0lBV0QsaUNBQU8sR0FBUDtRQUFBLGlCQThCQztRQTdCQSxJQUFJLFVBQVUsR0FBc0MsRUFBRSxDQUFDO1FBRXZELEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFD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