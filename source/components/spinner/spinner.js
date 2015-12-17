// /// <reference path='../../../typings/bootstrap-touchspin/bootstrap-touchspin.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
// /// <reference path='../../../typings/commonjs.d.ts' />
'use strict';
require('../../../libraries/bootstrap-touchspin/index');
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __string = typescript_angular_utilities_1.services.string;
var __number = typescript_angular_utilities_1.services.number;
var componentValidator_service_1 = require('../../services/componentValidator/componentValidator.service');
exports.moduleName = 'rl.ui.components.spinner';
exports.directiveName = 'rlSpinner';
exports.controllerName = 'SpinnerController';
exports.defaultMaxValue = 100000000000000000000;
var SpinnerController = (function () {
    function SpinnerController($scope, componentValidatorFactory) {
        var _this = this;
        var unregister = $scope.$watch(function () { return _this.ngModel; }, function (value) {
            if (!_.isUndefined(_this.validator)) {
                _this.spinnerValidator = componentValidatorFactory.getInstance({
                    ngModel: _this.ngModel,
                    $scope: $scope,
                    validators: [_this.validator],
                });
            }
            unregister();
        });
    }
    SpinnerController.$inject = ['$scope', componentValidator_service_1.factoryName];
    return SpinnerController;
})();
exports.SpinnerController = SpinnerController;
spinner.$inject = ['$timeout', __string.serviceName, __number.serviceName];
function spinner($timeout, stringUtility, numberUtility) {
    'use strict';
    return {
        restrict: 'E',
        template: require('./spinner.html'),
        require: '?^ngModel',
        controller: exports.controllerName,
        controllerAs: 'spinner',
        scope: {},
        bindToController: {
            min: '=',
            max: '=',
            step: '=',
            decimals: '=',
            prefix: '@',
            postfix: '@',
            roundToStep: '=',
            ngDisabled: '=',
            spinnerId: '@',
            name: '@',
            validator: '=',
        },
        link: function (scope, element, attrs, ngModel) {
            var spinner = scope.spinner;
            spinner.ngModel = ngModel;
            var unbindWatches;
            scope.$watch('ngDisabled', function (disabled) {
                if (disabled) {
                    if (_.isFunction(unbindWatches)) {
                        unbindWatches();
                    }
                }
                else {
                    // Initialize the spinner after $timeout to give angular a chance initialize ngModel
                    $timeout(function () {
                        var touchspin = element.find('input.spinner').TouchSpin({
                            min: (spinner.min != null ? spinner.min : 0),
                            max: (spinner.max != null ? spinner.max : exports.defaultMaxValue),
                            step: spinner.step,
                            prefix: spinner.prefix,
                            postfix: spinner.postfix,
                            decimals: spinner.decimals,
                            initval: ngModel.$viewValue,
                            forcestepdivisibility: spinner.roundToStep ? 'round' : 'none',
                        });
                        touchspin.on('change', function () {
                            scope.$apply(function () {
                                var spinValue = touchspin.val();
                                ngModel.$setViewValue(stringUtility.toNumber(spinValue));
                            });
                        });
                        var unbindViewWatch = scope.$watch(function () {
                            return ngModel.$viewValue;
                        }, function (newValue) {
                            touchspin.val(newValue != null ? newValue.toString() : '');
                        });
                        var unbindModelWatch = scope.$watch(function () {
                            return ngModel.$modelValue;
                        }, function (newModel) {
                            ngModel.$modelValue = round(newModel);
                        });
                        unbindWatches = function () {
                            unbindViewWatch();
                            unbindModelWatch();
                        };
                    });
                }
            });
            function round(num) {
                if (num != null && spinner.roundToStep) {
                    num = numberUtility.roundToStep(num, spinner.step);
                    num = numberUtility.preciseRound(num, spinner.decimals);
                }
                return num;
            }
        }
    };
}
angular.module(exports.moduleName, [__string.moduleName, componentValidator_service_1.moduleName, __number.moduleName])
    .directive(exports.directiveName, spinner)
    .controller(exports.controllerName, SpinnerController);
//# sourceMappingURL=spinner.js.map