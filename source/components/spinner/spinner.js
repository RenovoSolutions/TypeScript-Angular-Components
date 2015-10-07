// /// <reference path='../../../typings/bootstrap-touchspin/bootstrap-touchspin.d.ts' />
// /// <reference path='../../../typings/jquery/jquery.d.ts' />
'use strict';
require('../../../libraries/bootstrap-touchspin/index');
var angular = require('angular');
var typescript_angular_utilities_1 = require('typescript-angular-utilities');
var __string = typescript_angular_utilities_1.services.string;
var __number = typescript_angular_utilities_1.services.number;
exports.moduleName = 'rl.ui.components.spinner';
exports.directiveName = 'rlSpinner';
exports.controllerName = 'SpinnerController';
spinner.$inject = ['$timeout', __string.serviceName, __number.serviceName];
function spinner($timeout, stringUtility, numberUtility) {
    'use strict';
    return {
        restrict: 'E',
        template: "\n\t\t\t<rl-generic-container selector=\"ngDisabled\">\n\t\t\t\t<template default>\n\t\t\t\t\t<input name=\"{{name}}\" class=\"spinner\" ng-hide=\"ngDisabled\" id=\"{{spinnerId}}\" type=\"text\" />\n\t\t\t\t</template>\n\t\t\t\t<template when-selector=\"true\">\n\t\t\t\t\t<div class=\"input-group\" ng-show=\"prefix != null && postfix != null\">\n\t\t\t\t\t\t<span class=\"input-group-addon\">{{prefix}}</span>\n\t\t\t\t\t\t<input ng-disabled=\"ngDisabled\" type=\"text\" ng-model=\"ngModel\" class=\"form-control\" />\n\t\t\t\t\t\t<span class=\"input-group-addon\">{{postfix}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"input-group\" ng-show=\"prefix != null && postfix == null\">\n\t\t\t\t\t\t<span class=\"input-group-addon\">{{prefix}}</span>\n\t\t\t\t\t\t<input ng-disabled=\"ngDisabled\" type=\"text\" ng-model=\"ngModel\" class=\"form-control\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class=\"input-group\" ng-show=\"prefix == null && postfix != null\">\n\t\t\t\t\t\t<input ng-disabled=\"ngDisabled\" type=\"text\" ng-model=\"ngModel\" class=\"form-control\" />\n\t\t\t\t\t\t<span class=\"input-group-addon\">{{postfix}}</span>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div ng-show=\"prefix == null && postfix == null\">\n\t\t\t\t\t\t<input ng-disabled=\"ngDisabled\" type=\"text\" ng-model=\"ngModel\" class=\"form-control\" />\n\t\t\t\t\t</div>\n\t\t\t\t</template>\n\t\t\t</rl-generic-container>\n\t\t",
        require: '?^ngModel',
        scope: {
            min: '=',
            max: '=',
            step: '=',
            decimals: '=',
            prefix: '@',
            postfix: '@',
            roundToStep: '=',
            ngDisabled: '=',
            ngModel: '=',
            spinnerId: '@',
            name: '@',
        },
        link: function (scope, element, attrs, ngModel) {
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
                            min: (scope.min != null ? scope.min : Number.MIN_VALUE),
                            max: (scope.max != null ? scope.max : Number.MAX_VALUE),
                            step: scope.step,
                            prefix: scope.prefix,
                            postfix: scope.postfix,
                            decimals: scope.decimals,
                            initval: ngModel.$viewValue,
                            forcestepdivisibility: scope.roundToStep ? 'round' : 'none',
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
                            scope.ngModel = round(newModel);
                        });
                        unbindWatches = function () {
                            unbindViewWatch();
                            unbindModelWatch();
                        };
                    });
                }
            });
            function round(num) {
                if (num != null && scope.roundToStep) {
                    num = numberUtility.roundToStep(num, scope.step);
                    num = numberUtility.preciseRound(num, scope.decimals);
                }
                return num;
            }
        }
    };
}
angular.module(exports.moduleName, [__string.moduleName])
    .directive(exports.directiveName, spinner);
//# sourceMappingURL=spinner.js.map