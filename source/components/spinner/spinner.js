// /// <reference path='../../../typings/bootstrap-touchspin/bootstrap-touchspin.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('../../../libraries/bootstrap-touchspin/index');
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __string = typescript_angular_utilities_1.services.string;
var __number = typescript_angular_utilities_1.services.number;
var input_1 = require('../input/input');
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.spinner';
exports.componentName = 'rlSpinner';
exports.controllerName = 'SpinnerController';
exports.defaultMaxValue = 100000000000000000000;
var SpinnerController = (function (_super) {
    __extends(SpinnerController, _super);
    function SpinnerController($scope, $attrs, componentValidatorFactory, $element, $timeout) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.$element = $element;
        this.$timeout = $timeout;
        this.inputType = 'spinner';
    }
    SpinnerController.prototype.$postLink = function () {
        this.setDisabled(this.ngDisabled);
    };
    SpinnerController.prototype.$onChanges = function (changes) {
        if (changes.ngDisabled) {
            this.setDisabled(changes.ngDisabled.currentValue);
        }
    };
    SpinnerController.prototype.round = function (num) {
        if (num != null && this.roundToStep) {
            num = __number.numberUtility.roundToStep(num, this.step);
            num = __number.numberUtility.preciseRound(num, this.decimals);
        }
        return num;
    };
    SpinnerController.prototype.setDisabled = function (disabled) {
        var _this = this;
        if (disabled) {
            if (_.isFunction(this.unbindWatches)) {
                this.unbindWatches();
            }
        }
        else {
            // Initialize the spinner after $timeout to give angular a chance initialize ngModel
            this.$timeout(function () {
                var touchspin = _this.$element.find('input.spinner').TouchSpin({
                    min: (_this.min != null ? _this.min : 0),
                    max: (_this.max != null ? _this.max : exports.defaultMaxValue),
                    step: _this.step,
                    prefix: _this.prefix,
                    postfix: _this.postfix,
                    decimals: _this.decimals,
                    initval: _this.ngModel.$viewValue,
                    forcestepdivisibility: _this.roundToStep ? 'round' : 'none',
                });
                touchspin.on('change', function () {
                    _this.$scope.$apply(function () {
                        var spinValue = touchspin.val();
                        _this.ngModel.$setViewValue(__string.stringUtility.toNumber(spinValue));
                    });
                });
                var unbindViewWatch = _this.$scope.$watch(function () {
                    return _this.ngModel.$viewValue;
                }, function (newValue) {
                    touchspin.val(newValue != null ? newValue.toString() : '');
                });
                var unbindModelWatch = _this.$scope.$watch(function () {
                    return _this.ngModel.$modelValue;
                }, function (newModel) {
                    _this.ngModel.$modelValue = _this.round(newModel);
                });
                _this.unbindWatches = function () {
                    unbindViewWatch();
                    unbindModelWatch();
                };
            });
        }
    };
    SpinnerController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName, '$element', '$timeout'];
    return SpinnerController;
}(input_1.InputController));
exports.SpinnerController = SpinnerController;
var spinner = input_1.buildInput({
    template: require('./spinner.html'),
    controller: exports.controllerName,
    controllerAs: 'spinner',
    bindings: {
        min: '<?',
        max: '<?',
        step: '<?',
        decimals: '<?',
        prefix: '@',
        postfix: '@',
        roundToStep: '<?',
        ngDisabled: '<?',
        spinnerId: '@',
    },
});
angular.module(exports.moduleName, [input_1.moduleName])
    .component(exports.componentName, spinner)
    .controller(exports.controllerName, SpinnerController);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUZBQXlGO0FBQ3pGLCtEQUErRDtBQUMvRCwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDOzs7Ozs7QUFFYixRQUFPLDhDQUE4QyxDQUFDLENBQUE7QUFHdEQsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFHbEMsc0JBQXlGLGdCQUFnQixDQUFDLENBQUE7QUFDMUcsMkNBQXlGLDhEQUE4RCxDQUFDLENBQUE7QUFPM0ksa0JBQVUsR0FBVywwQkFBMEIsQ0FBQztBQUNoRCxxQkFBYSxHQUFXLFdBQVcsQ0FBQztBQUNwQyxzQkFBYyxHQUFXLG1CQUFtQixDQUFDO0FBRTdDLHVCQUFlLEdBQVcscUJBQXFCLENBQUM7QUF1QjdEO0lBQXVDLHFDQUFlO0lBWXJELDJCQUFZLE1BQXNCLEVBQzlCLE1BQXdCLEVBQ3hCLHlCQUFxRCxFQUM3QyxRQUFrQyxFQUNsQyxRQUFpQztRQUM1QyxrQkFBTSxNQUFNLEVBQUUsTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFHNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFDQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQsc0NBQVUsR0FBVixVQUFXLE9BQXdCO1FBQ2xDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1lB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