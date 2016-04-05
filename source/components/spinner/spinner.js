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
var required_1 = require('../../behaviors/required/required');
exports.moduleName = 'rl.ui.components.spinner';
exports.directiveName = 'rlSpinner';
exports.controllerName = 'SpinnerController';
exports.defaultMaxValue = 100000000000000000000;
var SpinnerController = (function (_super) {
    __extends(SpinnerController, _super);
    function SpinnerController($scope, $attrs, componentValidatorFactory) {
        _super.call(this, $scope, $attrs, componentValidatorFactory);
        this.inputType = 'spinner';
    }
    SpinnerController.$inject = ['$scope', '$attrs', componentValidator_service_1.factoryName];
    return SpinnerController;
}(input_1.InputController));
exports.SpinnerController = SpinnerController;
spinner.$inject = ['$timeout', __string.serviceName, __number.serviceName];
function spinner($timeout, stringUtility, numberUtility) {
    'use strict';
    return {
        restrict: 'E',
        template: require('./spinner.html'),
        require: { ngModel: 'ngModel', required: '?' + required_1.directiveName },
        controller: exports.controllerName,
        controllerAs: 'spinner',
        scope: {},
        bindToController: {
            min: '<?',
            max: '<?',
            step: '<?',
            decimals: '<?',
            prefix: '@',
            postfix: '@',
            roundToStep: '<?',
            ngDisabled: '<?',
            spinnerId: '@',
            name: '@',
            validator: '<?',
        },
        link: function (scope, element, attrs, controllers) {
            var spinner = scope.spinner;
            var ngModel = controllers.ngModel;
            spinner.ngModel = ngModel;
            var unbindWatches;
            scope.$watch('spinner.ngDisabled', function (disabled) {
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
angular.module(exports.moduleName, [__string.moduleName, __number.moduleName, input_1.moduleName])
    .directive(exports.directiveName, spinner)
    .controller(exports.controllerName, SpinnerController);
//# sourceMappingURL=spinner.js.map