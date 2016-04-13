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
        var _this = this;
        var unbindWatches;
        this.$scope.$watch('spinner.ngDisabled', function (disabled) {
            if (disabled) {
                if (_.isFunction(unbindWatches)) {
                    unbindWatches();
                }
            }
            else {
                // Initialize the spinner after $timeout to give angular a chance initialize ngModel
                _this.$timeout(function () {
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
                    unbindWatches = function () {
                        unbindViewWatch();
                        unbindModelWatch();
                    };
                });
            }
        });
    };
    SpinnerController.prototype.round = function (num) {
        if (num != null && this.roundToStep) {
            num = __number.numberUtility.roundToStep(num, this.step);
            num = __number.numberUtility.preciseRound(num, this.decimals);
        }
        return num;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUZBQXlGO0FBQ3pGLCtEQUErRDtBQUMvRCwwREFBMEQ7QUFFMUQsWUFBWSxDQUFDOzs7Ozs7QUFFYixRQUFPLDhDQUE4QyxDQUFDLENBQUE7QUFHdEQsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsNkNBQXlCLDhCQUE4QixDQUFDLENBQUE7QUFFeEQsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFDbEMsSUFBTyxRQUFRLEdBQUcsdUNBQVEsQ0FBQyxNQUFNLENBQUM7QUFHbEMsc0JBQXlGLGdCQUFnQixDQUFDLENBQUE7QUFDMUcsMkNBQXlGLDhEQUE4RCxDQUFDLENBQUE7QUFLN0ksa0JBQVUsR0FBVywwQkFBMEIsQ0FBQztBQUNoRCxxQkFBYSxHQUFXLFdBQVcsQ0FBQztBQUNwQyxzQkFBYyxHQUFXLG1CQUFtQixDQUFDO0FBRTdDLHVCQUFlLEdBQVcscUJBQXFCLENBQUM7QUFtQjNEO0lBQXVDLHFDQUFlO0lBWXJELDJCQUFZLE1BQXNCLEVBQzlCLE1BQXdCLEVBQ3hCLHlCQUFxRCxFQUM3QyxRQUFrQyxFQUNsQyxRQUFpQztRQUM1QyxrQkFBTSxNQUFNLEVBQUUsTUFBTSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFGdEMsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBeUI7UUFHNUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUIsQ0FBQztJQUVELHFDQUFTLEdBQVQ7UUFBQSxpQkErQ0M7UUE5Q0EsSUFBSSxhQUF1QixDQUFDO1FBQzVCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLG9CQUFvQixFQUFFLFVBQUMsUUFBaUI7WUFDMUQsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDZCxF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