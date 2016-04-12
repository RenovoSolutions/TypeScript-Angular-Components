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
//# sourceMappingURL=spinner.js.map